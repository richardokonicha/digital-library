import jwt
from jwt import PyJWKClient
from urllib.parse import urlencode, parse_qs
import httpx
from fastapi.encoders import jsonable_encoder

from schemas import GoogleUser

from api.server.database import (
    add_user,
    delete_user,
    retrieve_user,
    retrieve_users,
    update_user
)


audienceUrl="671175417906-cltad0en0d4v7a0o7btcfrljqbtlial1.apps.googleusercontent.com"
tokenUrl = "https://oauth2.googleapis.com/token"
jwkUrl = "https://www.googleapis.com/oauth2/v3/certs"


async def get_user_from_token(request):
    data = await request.body()
    parse_data = dict(parse_qs(data.decode("UTF-8")))
    params = {
        "grant_type": parse_data["grant_type"][0],
        "code": parse_data["code"][0],
        "client_id": parse_data["client_id"][0],
        "client_secret": parse_data["client_secret"][0],
        "redirect_uri": parse_data["redirect_uri"][0],
    }

    async with httpx.AsyncClient() as client:
        token_request = await client.post(tokenUrl, params=params)
        token_data = token_request.json()
        google_jwt_token = token_data["id_token"]
        jwks_client = PyJWKClient(jwkUrl)
        signing_key = jwks_client.get_signing_key_from_jwt(google_jwt_token)
        try:
            google_decoded_user = jwt.decode(
                google_jwt_token,
                signing_key.key,
                algorithms=["RS256"],
                audience=audienceUrl,
                options={"verify_exp": False},
            )
        except jwt.InvalidTokenError:
            return 401  # Invalid token
        except jwt.ExpiredSignatureError:
            return 401  # Token has expired
        except jwt.InvalidIssuerError:
            return 401  # Token is not issued by Google
        except jwt.InvalidAudienceError:
            return 401  # Token is not valid for this endpoint
        google_user = GoogleUser(**google_decoded_user)
    return google_user


async def get_google_user_from_db(google_user: GoogleUser):
    user = await retrieve_user(google_user.sub)
    if not user:
        print("new user")
        user = jsonable_encoder(google_user)
        new_user = await add_user(user)
    return user

