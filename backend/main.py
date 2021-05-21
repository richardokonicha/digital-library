from datetime import timedelta
from starlette.middleware.sessions import SessionMiddleware
import uvicorn
from backend.api import settings
from backend.api.service_utils.services import get_user_from_token, get_google_user_from_db, create_access_token
import fastapi
from fastapi import FastAPI, Request

from backend.api.db_utils.database import connect_db, disconnect_db
from backend.api.routers.user_router import router as UserRouter
from backend.api.routers.document_router import router as DocRouter

from backend.api.schema.schemas import GoogleUser, MDLUser, Token

__all__ = ["app"]


app = FastAPI(
    version="0.0.1",
    debug=settings.Settings.DEBUG,
    title=settings.Settings.PROJECT_NAME,
    docs_url="/",
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


app.add_middleware(SessionMiddleware, secret_key=settings.Settings.SECRET_KEY)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )


app.include_router(UserRouter, tags=["Users"], prefix="/user")
app.include_router(DocRouter, tags=["Documents"], prefix="/document")


@app.post("/token", response_model=Token)
async def login(request: Request):
    google_user: GoogleUser = await get_user_from_token(request)
    db_user: MDLUser = await get_google_user_from_db(google_user)
    access_token_expires = timedelta(minutes=settings.Settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    data: dict = {"sub": db_user.sub, "email": db_user.email, "name": db_user.name}
    access_token: str = create_access_token(data=data, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


if __name__ == "__main__":
    uvicorn.run(
        app,
        debug=settings.Settings.DEBUG,
        host=settings.Settings.HOST,
        port=settings.Settings.PORT,
        reload=settings.Settings.RELOAD,
        use_colors=settings.Settings.COLOR_LOGS,
        log_level=settings.Settings.LOGGER_LEVEL,
        proxy_headers=True,
    )
