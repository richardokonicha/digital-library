from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from api.dependecies.auth_dependency import get_current_active_user
from api.schema.schemas import MDLUser
from fastapi import Depends
from api.db_utils.user_crud import (
    add_user,
    delete_user,
    retrieve_user,
    retrieve_users,
    update_user
)

from api.schema.models import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,
    UpdateUserModel
)

router = APIRouter()


@router.get("/get_me")
async def read_me(current_user: MDLUser = Depends(get_current_active_user)):
    return current_user


@router.post("/", response_description="Student data added into the database")
async def add_user_data(user: UserSchema = Body(...), current_user: MDLUser = Depends(get_current_active_user)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "Student added successfully.")


@router.get("/", response_description="Students retrieved")
async def get_users(current_user: MDLUser = Depends(get_current_active_user)):
    users = await retrieve_users()
    if users:
        users = jsonable_encoder(users)
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")


@router.get("/{id}", response_description="User data retrieved")
async def get_user_data(idd, current_user: MDLUser = Depends(get_current_active_user)):
    user = await retrieve_user(idd)
    if user:
        user = jsonable_encoder(user)
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")


@router.put("/{id}")
async def update_user_data(idd: str, req: UpdateUserModel = Body(...), current_user: MDLUser = Depends(get_current_active_user)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_user = await update_user(idd, req)
    if updated_user:
        return ResponseModel(
            "User with ID: {} name update is successful".format(idd),
            "User name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data",
    )


@router.delete("/{id}", response_description="User data deleted from the database")
async def delete_user_data(idd: str, current_user: MDLUser = Depends(get_current_active_user)):
    deleted_user = await delete_user(idd)
    if deleted_user:
        return ResponseModel(
            f"User with ID: {idd} removed",
            "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        f"User with {idd}"
    )
