from fastapi import APIRouter
from starlette.responses import HTMLResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.requests import Request
from decouple import config

GOOGLE_CLIENT_ID = config("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = config("GOOGLE_CLIENT_SECRET")

router = APIRouter()

oauth = OAuth()

CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
oauth.register(
    name='google',
    server_metadata_url=CONF_URL,
    client_kwargs={
        'scope': 'openid email profile'
    },
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET
)


@router.get('/login')
async def login(request: Request):  
    redirect_uri = request.url_for('auth')
    print(redirect_uri)
    newurl = await oauth.google.authorize_redirect(request, redirect_uri)
    return newurl


@router.get('/auth')
async def auth(request: Request):
    print(request)
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        return HTMLResponse(f'<h1>{error.error}</h1>')
    user = await oauth.google.parse_id_token(request, token)
    request.session['user'] = dict(user)
    # return RedirectResponse(url='/')
    return {"access_token": token, "token_type": "bearer"}


@router.get('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')
