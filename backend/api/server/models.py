from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    year: int = Field(..., gt=0, lt=9)

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Richard Okonicha",
                "email": "richardokonicha@gmail.com",
                "year": 5,
            }
        }


class UpdateUserModel(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]
    year: Optional[int]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Richard Okonicha",
                "email": "richardokonicha@gmail.com",
                "year": 5
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message
    }


def ErrorResponseModel(error, code, message):
    return {
        "error": error,
        "code": code,
        "message": message
    }
