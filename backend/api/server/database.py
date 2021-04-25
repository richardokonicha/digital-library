import motor.motor_asyncio
from bson.objectid import ObjectId
from decouple import config
from schemas import GoogleUser


MONGO_DETAILS = config("MONGO_DETAILS")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.mdl_db
users_collection = database.get_collection("users")


# helper
def user_helper(users) -> dict:
    return {
        "id": str(users["_id"]),
        "fullname": users["fullname"],
        "email": users["email"],
        "year": users["year"]
    }


# CRUD
async def retrieve_users():
    users = []
    async for user in users_collection.find():
        users.append(user_helper(user))
    return users


async def add_user(user_data: dict) -> dict:
    user = await users_collection.insert_one(user_data)
    new_user = await users_collection.find_one({"sub": user.sub})
    return new_user


async def retrieve_user(idd: str) -> dict:
    user = await users_collection.find_one({"sub": idd})
    if user:
        return user


async def update_user(idd: str, data: dict):
    if len(data) < 1:
        return False
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
    user = await users_collection.find_one({"_id": ObjectId(idd)})
    if user:
        await users_collection.delete_one({"_id": ObjectId(idd)})
        return True
