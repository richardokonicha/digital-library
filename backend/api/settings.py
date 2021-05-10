import functools
import logging
import pathlib

import pydantic

__all__ = ["Settings"]

PROJECT_BASE_DIR = pathlib.Path(__file__).resolve().parent


class SettingsClass(pydantic.BaseSettings):
    # base
    PROJECT_NAME: str = pydantic.Field(default="Mechanical Digital Library")
    BASE_DIR: pydantic.DirectoryPath = pydantic.Field(default=PROJECT_BASE_DIR)
    SECRET_KEY: str = pydantic.Field(default="SECRET")
    ORIGINS_LIST: list[str] = pydantic.Field(default=["*"], env="ORIGINS")
    DEBUG: bool = pydantic.Field(default=False)
    RELOAD: bool = pydantic.Field(default=False)
    HOST: str = pydantic.Field(default="127.0.0.1")
    PORT: int = pydantic.Field(default=8000)
    # logging
    COLOR_LOGS: bool = pydantic.Field(default=False)
    LOGGER_NAME: str = pydantic.Field(default="MAIN_LOGGER")
    LOGGER_LEVEL: int = pydantic.Field(default=logging.INFO)
    # application
    ACCESS_TOKEN_EXPIRE_MINUTES: int = pydantic.Field(default=30)
    AUTHORIZATION_URL: str = pydantic.Field(default="https://accounts.google.com/o/oauth2/v2/auth")
    AUDIENCE_URL: str = pydantic.Field(default="671175417906-cltad0en0d4v7a0o7btcfrljqbtlial1.apps.googleusercontent.com")
    TOKEN_URL: str = pydantic.Field(default="/token")
    GOOGLE_TOKEN_URL: str = pydantic.Field(default="https://oauth2.googleapis.com/token")
    GOOGLE_JWK_URL: str = pydantic.Field(default="https://www.googleapis.com/oauth2/v3/certs")
    ALGORITHM: str = pydantic.Field(default="HS256")
    CLIENT_ID: str = pydantic.Field(default="671175417906-cltad0en0d4v7a0o7btcfrljqbtlial1.apps.googleusercontent.com")
    CLIENT_SECRET: str = pydantic.Field(default="ltY2Xyc1gb6P*******")

    #s3
    # AWS_SERVER_PUBLIC_KEY: str
    # AWS_SERVER_SECRET_KEY: str
    # database
    MONGO_DETAILS: str = pydantic.Field(default="mongodb+srv://***:***@cluster0.lxeqg.mongodb.net/")
    MONGO_DB_NAME: str = pydantic.Field(default="MDL")

    MONGO_TEST_URL: str = pydantic.Field(default="mongodb://0.0.0.0:27017")
    MONGO_TEST_DB_NAME: str = pydantic.Field(default="test_db")
    MONGO_LOGGER_COMMAND: bool = pydantic.Field(default=False)
    MONGO_LOGGER_CONNECTION_POOL: bool = pydantic.Field(default=False)
    MONGO_LOGGER_HEARTBEAT: bool = pydantic.Field(default=False)
    MONGO_LOGGER_SERVER: bool = pydantic.Field(default=False)
    MONGO_LOGGER_TOPOLOGY: bool = pydantic.Field(default=False)

    class Config:
        env_file = PROJECT_BASE_DIR / ".env"


@functools.lru_cache()
def get_settings() -> SettingsClass:
    return SettingsClass()


Settings: SettingsClass = get_settings()