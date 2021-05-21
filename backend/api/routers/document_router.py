from fastapi import APIRouter, Body, File, UploadFile
from fastapi.encoders import jsonable_encoder
from backend.api.schema.schemas import MDLUser
from backend.api.dependecies.auth_dependency import get_current_active_user
from fastapi import Depends
from backend.api.db_utils.document_crud import (
    add_document,
    delete_document,
    retrieve_document,
    retrieve_documents,
    update_document
)

from backend.api.schema.models import (
    DocumentSchema,
    ResponseModel,
    ErrorResponseModel,
    UpdateDocumentModel
)

router = APIRouter()


@router.post("/", response_description="Document data added into the database")
async def add_document_data(file: UploadFile = File(...), current_user: MDLUser = Depends(get_current_active_user)):
    new_doc = await add_document(file, current_user)
    return ResponseModel(new_doc, "Document added successfully.")


@router.get("/", response_description="Documents retrieved")
async def get_documents(current_user: MDLUser = Depends(get_current_active_user)):
    docs = await retrieve_documents()
    if docs:
        docs = jsonable_encoder(docs)
        return ResponseModel(docs, "docs data retrieved successfully")
    return ResponseModel(docs, "Empty list returned")


@router.get("/{id}", response_description="documents data retrieved")
async def get_document_data(id, current_user: MDLUser = Depends(get_current_active_user)):
    doc = await retrieve_document(id)
    if doc:
        doc = jsonable_encoder(doc)
        return ResponseModel(doc, "document data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "doc doesn't exist.")


@router.put("/{id}")
async def update_document_data(id: str, req: UpdateDocumentModel = Body(...), current_user: MDLUser = Depends(get_current_active_user)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_document = await update_document(id, req)
    if updated_document:
        return ResponseModel(
            "Document with ID: {} name update is successful".format(id),
            "Document name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the Document data",
    )


@router.delete("/{id}", response_description="Document deleted from the database")
async def delete_document_data(idd: str, current_user: MDLUser = Depends(get_current_active_user)):
    deleted_document = await delete_document(idd)
    if deleted_document:
        return ResponseModel(
            f"Document with ID: {idd} removed",
            "Document deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        f"Document with {idd}"
    )
