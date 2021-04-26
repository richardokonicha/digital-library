from bson.objectid import ObjectId
import settings
from motor.motor_asyncio import AsyncIOMotorClient
from schemas import MDLUser


class DataBase:
    client: AsyncIOMotorClient = None


db = DataBase()


def get_db_client() -> AsyncIOMotorClient:
    if db.client is None:
        print('RECONNECTING TO DB.........')
        db.client = AsyncIOMotorClient(settings.Settings.MONGO_DETAILS)
        return db.client.mdl_db.get_collection("users")
    else:
        return db.client.mdl_db.get_collection("users")


async def connect_db():
    print('CONNECTING TO DB')
    """Create database connection."""
    db.client = AsyncIOMotorClient(settings.Settings.MONGO_DETAILS)


def disconnect_db():
    print("Closing DB")
    """Close database connection."""
    db.client.close()


# CRUD
async def retrieve_users():
    users_collection = get_db_client()
    users = []
    async for user in users_collection.find():
        users.append(MDLUser(**user))
    return users


async def add_user(user_data: dict) -> MDLUser:
    users_collection = get_db_client()
    user = await users_collection.insert_one(user_data)
    new_user = await users_collection.find_one({"sub": user.sub})
    return MDLUser(**new_user)


async def retrieve_user(idd: str) -> MDLUser:
    users_collection = get_db_client()
    user = await users_collection.find_one({"sub": idd})
    if user:
        return MDLUser(**user)


async def update_user(idd: str, data: dict):
    if len(data) < 1:
        return False
    users_collection = get_db_client()
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
    users_collection = get_db_client()
    user = await users_collection.find_one({"_id": ObjectId(idd)})
    if user:
        await users_collection.delete_one({"_id": ObjectId(idd)})
        return True
