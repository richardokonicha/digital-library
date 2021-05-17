from api.db_utils.database import get_db_client
from api.schema.schemas import MDLDocument
from bson.objectid import ObjectId
from api.db_utils.s3_base import s3_auth
from api.db_utils.s3_crud import get_list_of_buckets, upload_file_to_bucket
from api.settings import Settings


# CRUD
async def retrieve_documents():
    doc_collection = get_db_client()
    doc = []
    async for doc in doc_collection.find():
        doc.append(MDLDocument(**doc))
    return doc


async def add_document(file) -> MDLDocument:
    s3_client = s3_auth()
    file_url = upload_file_to_bucket(s3_client, file.file, Settings.S3_BUCKET, "folder", object_name=file.filename)
    # doc = await doc_collection.insert_one(doc_data)
    # new_document = await doc_collection.find_one({"sub": doc.sub})
    # return MDLDocument(**new_document)
    return file_url


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
