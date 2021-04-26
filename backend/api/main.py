from datetime import timedelta
from starlette.middleware.sessions import SessionMiddleware
import uvicorn
import settings
from services import get_user_from_token, get_google_user_from_db, create_access_token
import fastapi
from fastapi import FastAPI, Depends, Security, Request
from fastapi.security import OAuth2AuthorizationCodeBearer
from database import connect_db, disconnect_db
from users import router as UserRouter
from schemas import GoogleUser, MDLUser


__all__ = ["App"]


App = FastAPI(
    version="0.0.1",
    debug=settings.Settings.DEBUG,
    title=settings.Settings.PROJECT_NAME,
    docs_url="/docs/",
    redoc_url="/redoc/",
    servers=[
        {"url": "http://127.0.0.1:8000/", "description": "Local Development Server"},
        {"url": "https://dev.mdl.com", "description": "Production server"},
    ],
    description="Quick start FastAPI project template",
    default_response_class=fastapi.responses.ORJSONResponse,
    on_startup=[connect_db],
    on_shutdown=[disconnect_db],
    swagger_ui_init_oauth={
        "clientId": settings.Settings.CLIENT_ID,
        "clientSecret": settings.Settings.CLIENT_SECRET
    }
)


App.add_middleware(SessionMiddleware, secret_key=settings.Settings.SECRET_KEY)
# App.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )


# app.include_router(AuthRouter, tags=["Authentication"], prefix="/authentication")
App.include_router(UserRouter, tags=["Users"], prefix="/user")


oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=settings.Settings.AUTHORIZATION_URL,
    tokenUrl=settings.Settings.TOKEN_URL,
    auto_error=True,
    scopes={"openid": "Get openId data",
            "email": "Get email access",
            "profile": "Get profile information"}
    )


from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


def fake_decode_token(token):
    """THIS IS A SUB DEPENDENCY, A DEPENDENCY FOR GET CURRENT USER DEPENDENCY"""
    return User(
        username="token" + "foredeck", email="john@example.com", full_name="John Doe"
    )


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """THIS IS A DEPENDENCY THAT RETURNS USER"""
    user = fake_decode_token(token)
    user = User(username="hey", email="richard@gmailcom", full_name="str")
    return user


@App.get("/get_user")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@App.post("/token")
async def login(request: Request):
    google_user: GoogleUser = await get_user_from_token(request)
    db_user: MDLUser = await get_google_user_from_db(google_user)
    access_token_expires = timedelta(minutes=settings.Settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    data = {"sub": db_user.sub, "email": db_user.email, "name": db_user.name}
    access_token: str = create_access_token(data=data, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


if __name__ == "__main__":
    uvicorn.run(
        App,
        debug=settings.Settings.DEBUG,
        host=settings.Settings.HOST,
        port=settings.Settings.PORT,
        reload=settings.Settings.RELOAD,
        use_colors=settings.Settings.COLOR_LOGS,
        log_level=settings.Settings.LOGGER_LEVEL,
        proxy_headers=True,
    )
