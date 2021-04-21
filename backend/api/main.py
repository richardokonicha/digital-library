import json
from typing import Optional
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
import httpx

import jwt
from jwt import PyJWTError


from fastapi import FastAPI, Depends, Security
from fastapi.security import OAuth2AuthorizationCodeBearer

from api.routers.auth import router as AuthRouter
from api.routers.users import router as UserRouter

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)


app.include_router(AuthRouter, tags=["Authentication"], prefix="/authentication")
app.include_router(UserRouter, tags=["Users"], prefix="/user")

authorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth"
tokenUrl = "https://oauth2.googleapis.com/token"


oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=authorizationUrl, tokenUrl=tokenUrl, auto_error=True, scopes={"openid":"", "email":"", "profile":""})


@app.get('/')
async def homepage(request: Request):
    user = request.session.get('user')
    if user:
        data = json.dumps(user)
        html = (
            f'<pre>{data}</pre>'
            '<a href="/authentication/logout">logout</a>'
        )
        return HTMLResponse(html)
    return HTMLResponse('<a href="/authentication/login">login</a>')


@app.get("/get_user")
async def read_item(token: Optional[str] = Security(oauth2_scheme)):
    userurl = "https://openidconnect.googleapis.com/v1/userinfo"

    headers = {
        'scope': "openid profile email",
        'accept': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    r = httpx.get(userurl, headers=headers)
    return {"hello": r.json()}



# app.add_middleware(
#     CORSMiddleware,
#     SessionMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )