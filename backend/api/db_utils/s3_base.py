import boto3
from botocore.client import BaseClient

from api import settings


def s3_auth() -> BaseClient:
    s3 = boto3.client(service_name='s3', aws_access_key_id=settings.Settings.AWS_SERVER_PUBLIC_KEY,
                      aws_secret_access_key=settings.Settings.AWS_SERVER_SECRET_KEY
                      )

    return s3
