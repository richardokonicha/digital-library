from backend.api.db_utils.database import get_db_client
from backend.api.schema.schemas import MDLDocument
from bson.objectid import ObjectId
from backend.api.db_utils.s3_base import s3_auth
from backend.api.db_utils.s3_crud import get_list_of_buckets, upload_file_to_bucket
from backend.api.settings import Settings
from uuid import UUID, uuid4
from datetime import datetime, time, timedelta


# CRUD
async def retrieve_documents():
    document_collection = get_db_client().get_collection("documents")
    docs = []
    async for doc in document_collection.find():
        docs.append(MDLDocument(**doc))
    return docs


async def add_document(file, current_user) -> MDLDocument:
    s3_client = s3_auth()
    file_url = upload_file_to_bucket(s3_client, file.file, Settings.S3_BUCKET, "folder", object_name=file.filename)
    document_collection = get_db_client().get_collection("documents")
    doc_data = {
        "uuid": uuid4(),
        "uploader_sub": current_user.sub,
        "uploaded_by": current_user.name,
        "filename": file.filename,
        "destination_uri": file_url,
        "tags": ["mechanical"],
    }
    doc = await document_collection.insert_one(doc_data)
    new_document = await document_collection.find_one({"uuid": doc_data["uuid"]})
    return MDLDocument(**new_document)


async def retrieve_document(idd: str) -> MDLDocument:
    document_collection = get_db_client().get_collection("documents")
    doc = await document_collection.find_one({"uuid": idd})
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
