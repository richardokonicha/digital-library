from pydantic import BaseModel, EmailStr, HttpUrl, Field
from bson import ObjectId
from typing import Optional, List
from uuid import UUID


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class GoogleUser(BaseModel):
    sub: str
    name: str
    email: EmailStr
    picture: str
    given_name: str
    family_name: str
    email_verified: bool


class MDLUser(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    sub: str
    name: str
    email: EmailStr
    picture: str
    given_name: str
    family_name: str
    email_verified: bool

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example":
                {
                    "_id": {"$oid": "608578601973980cd4d6a67c"},
                    "sub": "11782829400001778",
                    "name": "Richard Okonicha",
                    "email": "richardokonicha@gmail.com",
                    "picture": "https://lh3.googleusercontent.com/a-/AOh14GisT0zIbv0BtXR76NPH83Oz88ZSLbVGSzM_GhJqoQ=s96-c",
                    "given_name": "Richard",
                    "family_name": "Okonicha",
                    "email_verified": True
                }
        }


class MDLDocument(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    uuid: UUID
    uploader_sub: str
    uploaded_by: str
    filename: str
    destination_uri: str
    tags: Optional[List[str]]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example":
                {
                    "_id": {"$oid": "608578601973980cd4d6a67c"},
                    "uploader_sub": "11782829400001778",
                    "uploaded_by": "Richard Okonicha",
                    "filename": "strength of material",
                    "destination_uri": "https://s3.us-west-1.wasabisys.com/mechanical-digital-library/folder/oo.png",
                    "tags": ["mechanical"],
                }
        }


class Token(BaseModel):
    access_token: str
    token_type: str

