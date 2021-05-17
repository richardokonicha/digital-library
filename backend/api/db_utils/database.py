from bson.objectid import ObjectId
from api import settings
from motor.motor_asyncio import AsyncIOMotorClient
from api.schema.schemas import MDLUser


class DataBase:
    client: AsyncIOMotorClient = None


db = DataBase()


def get_db_client() -> AsyncIOMotorClient:
    if db.client is None:
        print('RECONNECTING TO DB.........')

        db.client = AsyncIOMotorClient(settings.Settings.MONGO_DETAILS)
        return db.client.mdl_db
    else:
        return db.client.mdl_db


def connect_db():
    print('CONNECTING TO DB')
    """Create database connection."""
    db.client = AsyncIOMotorClient(settings.Settings.MONGO_DETAILS)


def disconnect_db():
    print("Closing DB")
    """Close database connection."""
    db.client.close()

