import boto3
from botocore.client import BaseClient

from backend.api.settings import Settings


def s3_auth() -> BaseClient:
    s3 = boto3.client(service_name='s3', endpoint_url=Settings.S3_ENDPOINT_URL,
                      aws_access_key_id=Settings.S3_SERVER_PUBLIC_KEY,
                      aws_secret_access_key=Settings.S3_SERVER_SECRET_KEY
                      )

    return s3
