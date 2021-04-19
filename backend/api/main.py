import json
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from fastapi import FastAPI
from api.routers.auth import router as AuthRouter
from api.routers.users import router as UserRouter


app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="!secret")
# app.add_middleware(
#     CORSMiddleware,
#     SessionMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

app.include_router(AuthRouter, tags=["Authentication"], prefix="/authentication")
app.include_router(UserRouter, tags=["Users"], prefix="/user")


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


@app.get("/items")
def read_item():
    return {"hello": "world"}