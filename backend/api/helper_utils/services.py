import jwt
from jwt import PyJWKClient
from urllib.parse import parse_qs
import httpx
from fastapi.encoders import jsonable_encoder
from datetime import datetime, timedelta
from schemas import GoogleUser, MDLUser
from typing import Optional
from pydantic import BaseModel, ValidationError
import settings
from database import (
    add_user,
    retrieve_user,
)
from fastapi import HTTPException


async def get_user_from_token(request):
    data = await request.body()
    parse_data = dict(parse_qs(data.decode("UTF-8")))
    params = {
        "grant_type": parse_data["grant_type"][0],
        "code": parse_data["code"][0],
        "client_id": parse_data["client_id"][0],
        "client_secret": parse_data["client_secret"][0],
        "redirect_uri": parse_data["redirect_uri"][0],
    }
    async with httpx.AsyncClient() as client:
        token_request = await client.post(settings.Settings.GOOGLE_TOKEN_URL, params=params)
        token_data = token_request.json()
        google_jwt_token = token_data["id_token"]
        jwk_client = PyJWKClient(settings.Settings.GOOGLE_JWK_URL)
        signing_key = jwk_client.get_signing_key_from_jwt(google_jwt_token)
        try:
            google_decoded_user = jwt.decode(
                google_jwt_token,
                signing_key.key,
                algorithms=["RS256"],
                audience=settings.Settings.AUDIENCE_URL,
                options={"verify_exp": False},
            )
        except jwt.InvalidTokenError:
            return 401
        google_user = GoogleUser(**google_decoded_user)
    return google_user


async def get_google_user_from_db(google_user):
    user = await retrieve_user(google_user.sub)
    if not user:
        print("new user")
        json_user = jsonable_encoder(google_user)
        user: MDLUser = await add_user(json_user)
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.Settings.SECRET_KEY, algorithm=settings.Settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str):
    authenticate_value = f"Bearer"
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    try:
        payload = jwt.decode(token, settings.Settings.SECRET_KEY, algorithms=[settings.Settings.ALGORITHM])
        sub: str = payload.get("sub")
        print(f"{payload.get('name')} just walked in")
        if sub is None:
            raise credentials_exception
        return sub
    except (jwt.PyJWTError, ValidationError):
        raise credentials_exception
