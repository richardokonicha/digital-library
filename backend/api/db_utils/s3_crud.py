import logging
from botocore.exceptions import ClientError
from enum import Enum
from botocore.client import BaseClient
from fastapi import Depends
from backend.api.db_utils.s3_base import s3_auth
from backend.api.settings import Settings


def upload_file_to_bucket(s3_client, file_obj, bucket, folder, object_name=None):
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_obj
    # Upload the file
    try:
        response = s3_client.upload_fileobj(file_obj, bucket, f"{folder}/{object_name}")
    except ClientError as e:
        logging.error(e)
        return False
    return f"{Settings.S3_ENDPOINT_URL}/{bucket}/{folder}/{object_name}"


def get_list_of_buckets(s3: BaseClient = Depends(s3_auth)):
    response = s3.list_buckets()
    buckets = {}
    for buckets in response['Buckets']:
        buckets[response['Name']] = response['Name']
    BucketName = Enum('BucketName', buckets)
    return BucketName
