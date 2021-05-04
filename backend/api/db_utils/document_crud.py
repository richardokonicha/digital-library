from api.db_utils.database import get_db_client

from api.schema.schemas import MDLDocument

from bson.objectid import ObjectId


# CRUD
async def retrieve_documents():
    doc_collection = get_db_client()
    doc = []
    async for doc in doc_collection.find():
        doc.append(MDLDocument(**doc))
    return doc


async def add_document(doc_data: dict) -> MDLDocument:
    doc_collection = get_db_client()
    doc = await doc_collection.insert_one(doc_data)
    new_document = await doc_collection.find_one({"sub": doc.sub})
    return MDLDocument(**new_document)


async def retrieve_document(idd: str) -> MDLDocument:
    doc_collection = get_db_client()
    doc = await doc_collection.find_one({"sub": idd})
    if doc:
        return MDLDocument(**doc)


async def update_document(idd: str, data: dict):
    if len(data) < 1:
        return False
    doc_collection = get_db_client()
    doc = await doc_collection.find_one({"_id": ObjectId(idd)})
    if doc:
        updated_document = await doc_collection.update_one(
            {"_id": ObjectId(idd)},
            {"$set": data}
        )
        if updated_document:
            return True
        return False


async def delete_document(idd: str):
    doc_collection = get_db_client()
    doc = await doc_collection.find_one({"_id": ObjectId(idd)})
    if doc:
        await doc_collection.delete_one({"_id": ObjectId(idd)})
        return True
