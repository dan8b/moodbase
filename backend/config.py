from pydantic import BaseSettings
from dotenv import load_dotenv
load_dotenv('.env')
from decouple import config

secretKey=config('secret')

class Secret(BaseSettings):
    authjwt_secret_key = secretKey

