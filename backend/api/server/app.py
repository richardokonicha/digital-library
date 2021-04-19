from fastapi import FastAPI
from api.routers.users import router as UserRouter

app = FastAPI()

app.include_router(UserRouter, tags=["Users"], prefix="/student")
