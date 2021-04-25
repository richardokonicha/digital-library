import json
from typing import Optional, Dict
from schemas import GoogleUser

# from starlette.requests import Request

from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from pydantic import BaseModel
import uvicorn

from services import get_user_from_token, get_google_user_from_db

# from jwt import PyJWTError

from fastapi import FastAPI, Depends, Security, Request
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer, OAuth2PasswordRequestForm

from api.server.database import (
    add_user,
    delete_user,
    retrieve_user,
    retrieve_users,
    update_user
)
# from api.routers.auth import router as AuthRouter
# from api.routers.users import router as UserRouter

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# app.include_router(AuthRouter, tags=["Authentication"], prefix="/authentication")
# app.include_router(UserRouter, tags=["Users"], prefix="/user")

authorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth"

# userUrl = "https://openidconnect.googleapis.cjwkUrlom/v1/userinfo"
# 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid'
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token" )



oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=authorizationUrl,
    tokenUrl="/token",
    auto_error=True,
    scopes={"openid": " ", "email": "Email", "profile": "Profile information"}
)


# @app.get('/')
# async def homepage(request: Request):
#     user = request.session.get('user')
#     if user:
#         data = json.dumps(user)
#         html = (
#             f'<pre>{data}</pre>'
#             '<a href="/authentication/logout">logout</a>'
#         )
#         return HTMLResponse(html)
#     return HTMLResponse('<a href="/authentication/login">login</a>')


# @app.get("/get_user")
# async def read_item(token: Optional[str] = Security(oauth2_scheme)):
#     userurl = "https://openidconnect.googleapis.com/v1/userinfo"
#     headers = {
#         'scope': "openid profile email",
#         'accept': 'application/json',
#         'Authorization': f'Bearer {token}'
#     }
#     r = httpx.get(userurl, headers=headers)
#     return {"hello": r.json()}


# app.add_middleware(
#     CORSMiddleware,
#     SessionMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

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
    # user = fake_decode_token(token)
    user = User(username="hey", email="richard@gmailcom", full_name="str")
    return user


@app.get("/get_user")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


# token endpoint
# @app.post("/token")
# async def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     user_dict = fake_users_db.get(form_data.username)
#     # if not user_dict:
#     #     raise HTTPException(status_code=400, detail="Incorrect username or password")
#     # user = UserInDB(**user_dict)
#     # hashed_password = fake_hash_password(form_data.password)
#     # if not hashed_password == user.hashed_password:
#     #     raise HTTPException(status_code=400, detail="Incorrect username or password")

#     return {"access_token": "user_dict", "token_type": "bearer"}


@app.post("/token")
async def login(request: Request):
    google_user = await get_user_from_token(request)
    db_user = await get_google_user_from_db(google_user)
    print(db_user)

    return {"access_token": "user_dict", "token_type": "bearer"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)