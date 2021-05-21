from bson.objectid import ObjectId
from backend.api.schema.schemas import MDLUser
from backend.api.db_utils.database import get_db_client


# CRUD
async def retrieve_users():
    users_collection = get_db_client().get_collection("users")
    users = []
    async for user in users_collection.find():
        users.append(MDLUser(**user))
    return users


async def add_user(user_data: dict) -> MDLUser:
    users_collection = get_db_client().get_collection("users")
    user = await users_collection.insert_one(user_data)
    new_user = await users_collection.find_one({"sub": user.sub})
    return MDLUser(**new_user)


async def retrieve_user(idd: str) -> MDLUser:
    users_collection = get_db_client().get_collection("users")
    user = await users_collection.find_one({"sub": idd})
    if user:
        return MDLUser(**user)


async def update_user(idd: str, data: dict):
    if len(data) < 1:
        return False
    users_collection = get_db_client().get_collection("users")
    user = await users_collection.find_one({"_id": ObjectId(idd)})
    if user:
        updated_user = await users_collection.update_one(
            {"_id": ObjectId(idd)},
            {"$set": data}
        )
        if updated_user:
            return True
        return False


async def delete_user(idd: str):
    users_collection = get_db_client().get_collection("users")
    user = await users_collection.find_one({"_id": ObjectId(idd)})
    if user:
        await users_collection.delete_one({"_id": ObjectId(idd)})
        return True
