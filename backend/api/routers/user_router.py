from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from auth_dependency import get_current_active_user
from schemas import MDLUser
from fastapi import Depends
from database import (
    add_user,
    delete_user,
    retrieve_user,
    retrieve_users,
    update_user
)

from server.models import (
    UserSchema,
    ResponseModel,
    ErrorResponseModel,
    UpdateUserModel
)

router = APIRouter()


@router.get("/get_user")
async def read_users_me(current_user: MDLUser = Depends(get_current_active_user)):
    return current_user


@router.post("/", response_description="Student data added into the database")
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "Student added successfully.")


@router.get("/", response_description="Students retrieved")
async def get_users():
    users = await retrieve_users()
    if users:
        users = jsonable_encoder(users)
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")


@router.get("/{id}", response_description="User data retrieved")
async def get_user_data(id):
    user = await retrieve_user(id)
    if user:
        user = jsonable_encoder(user)
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")


@router.put("/{id}")
async def update_user_data(id: str, req: UpdateUserModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_user = await update_user(id, req)
    if updated_user:
        return ResponseModel(
            "User with ID: {} name update is successful".format(id),
            "User name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data",
    )


@router.delete("/{id}", response_description="User data deleted from the database")
async def delete_user_data(id: str):
    deleted_user = await delete_user(id)
    if deleted_user:
        return ResponseModel(
            f"User with ID: {id} removed",
            "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        f"User with {id}"
    )
