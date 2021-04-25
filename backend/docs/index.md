# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
### Request handling

####Use of application/x-www-form-urlencoded Media Type 
https://tools.ietf.org/html/rfc6749#appendix-B
 
   ```At the time of publication of this specification, the
   "application/x-www-form-urlencoded" media type was defined in
   Section 17.13.4 of [W3C.REC-html401-19991224] but not registered in
   the IANA MIME Media Types registry
   (<http://www.iana.org/assignments/media-types>).  Furthermore, that
   definition is incomplete, as it does not consider non-US-ASCII
   characters.
```
   To address this shortcoming when generating payloads using this media
   type, names and values MUST be encoded using the UTF-8 character
   encoding scheme [RFC3629] first; the resulting octet sequence then
   needs to be further encoded using the escaping rules defined in
   [W3C.REC-html401-19991224].

   When parsing data from a payload using this media type, the names and
   values resulting from reversing the name/value encoding consequently
   need to be treated as octet sequences, to be decoded using the UTF-8
   character encoding scheme.

   For example, the value consisting of the six Unicode code points
   (1) U+0020 (SPACE), (2) U+0025 (PERCENT SIGN),
   (3) U+0026 (AMPERSAND), (4) U+002B (PLUS SIGN),
   (5) U+00A3 (POUND SIGN), and (6) U+20AC (EURO SIGN) would be encoded
   into the octet sequence below (using hexadecimal notation):

     `20 25 26 2B C2 A3 E2 82 AC`

   and then represented in the payload as:

     `+%25%26%2B%C2%A3%E2%82%AC`

`b'grant_type=authorization_code&code=4%2F0AY0e-g7kEuLx1iBf03lsKRcX_nrvVqB6PvVrtIdihwjnYMNXcHZEPBgOv0U87e8tp-Eo8g&client_id=671175417906-cltad0en0d4v7a0o7btcfrljqbtlial1.apps.googleusercontent.com&client_secret=ltY2Xyc1gb6Pj9Kn_IOQIKdw&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fdocs%2Foauth2-redirect'
`

Decoding

    async with httpx.AsyncClient() as client:
        token_request = await client.post(tokenUrl, params=params)
        response: Dict[bytes, bytes] = dict(parse_qsl(token_request.content))

Exchange code for access token and ID token

The response includes a code parameter, a one-time authorization code that your server can exchange for an access token and ID token. Your server makes this exchange by sending an HTTPS POST request. The POST request is sent to the token endpoint, which you should retrieve from the Discovery document using the token_endpoint metadata value. The following discussion assumes the endpoint is https://oauth2.googleapis.com/token





    async with httpx.AsyncClient() as client:
        token_request = await client.post(tokenUrl, params=params)
        token_data = token_request.json()
        google_jwt_token = token_data["id_token"]



PyJWT is a Python library which allows you to encode and decode JSON Web Tokens (JWT). JWT is an open, industry-standard (RFC 7519) for representing claims securely between two parties.
