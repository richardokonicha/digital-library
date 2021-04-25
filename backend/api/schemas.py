from pydantic import BaseModel, EmailStr, HttpUrl


class GoogleUser(BaseModel):
    sub: str
    name: str
    email: EmailStr
    picture: str
    given_name: str
    family_name: str
    email_verified: bool

