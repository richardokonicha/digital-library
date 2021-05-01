import settings
from fastapi.security import OAuth2AuthorizationCodeBearer
from fastapi import Depends
from services import decode_access_token
from database import retrieve_user
from schemas import MDLUser


oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=settings.Settings.AUTHORIZATION_URL,
    tokenUrl=settings.Settings.TOKEN_URL,
    auto_error=True,
    scopes={"openid": "Get openId data",
            "email": "Get email access",
            "profile": "Get profile information"}
    )


async def get_current_active_user(token: str = Depends(oauth2_scheme)) -> MDLUser:
    """THIS IS A DEPENDENCY THAT RETURNS USER"""
    user_sub: str = decode_access_token(token)
    user: MDLUser = await retrieve_user(user_sub)
    return user
