from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from auth_dependency import get_current_active_user
from schemas import MDLUser
from fastapi import Depends
from database import (
    add_document,
    delete_document,
    retrieve_document,
    retrieve_documents,
    update_document
)

from server.models import (
    DocumentSchema,
    ResponseModel,
    ErrorResponseModel,
    UpdateDocumentSchema
)

router = APIRouter()


# @router.get("/get_document")
# async def read_documents_me(current_document: MDLUser = Depends(get_current_active_user
#     return current_document


@router.post("/", response_description="Document data added into the database")
async def add_document_data(doc: DocumentSchema = Body(...)):
    doc = jsonable_encoder(doc)
    new_doc = await add_document(doc)
    return ResponseModel(new_document, "Document added successfully.")


@router.get("/", response_description="Documents retrieved")
async def get_documents():
    docs = await retrieve_documents()
    if docs:
        docs = jsonable_encoder(docs)
        return ResponseModel(docs, "docs data retrieved successfully")
    return ResponseModel(docs, "Empty list returned")


@router.get("/{id}", response_description="documents data retrieved")
async def get_document_data(id):
    doc = await retrieve_document(id)
    if doc:
        doc = jsonable_encoder(doc)
        return ResponseModel(doc, "document data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "doc doesn't exist.")


@router.put("/{id}")
async def update_document_data(id: str, req: UpdatedocModel = Body(...)):
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
async def delete_document_data(id: int):
    deleted_document = await delete_document(id)
    if deleted_document:
        return ResponseModel(
            f"Document with ID: {id} removed",
            "Document deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        f"Document with {id}"
    )
