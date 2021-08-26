from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pathlib import Path
from dotenv import load_dotenv
load_dotenv('.env')
from decouple import config

# environment variables
class Envs:
    MAIL_USERNAME = config('MAIL_USERNAME')
    MAIL_PASSWORD = config('MAIL_PASSWORD')
    MAIL_FROM = config('MAIL_FROM')
    MAIL_PORT = int(config('MAIL_PORT'))
    MAIL_SERVER = config('MAIL_SERVER')
    MAIL_FROM_NAME = config('MAIL_FROM_NAME')

# mail config

mailer = ConnectionConfig(
    MAIL_USERNAME=Envs.MAIL_USERNAME,
    MAIL_PASSWORD=Envs.MAIL_PASSWORD,
    MAIL_FROM=Envs.MAIL_FROM,
    MAIL_PORT=Envs.MAIL_PORT,
    MAIL_SERVER=Envs.MAIL_SERVER,
    MAIL_FROM_NAME=Envs.MAIL_FROM_NAME,
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    TEMPLATE_FOLDER=Path('.').parent / "templates"
)

# mail functions

async def send_email_async(url:str, subject: str, recipient: str, template: str):
    recipient="danbidikov@gmail.com"
    template_body={'url':url}
    message = MessageSchema(
        subject=subject,
        recipients=[recipient],
        template_body=template_body,
        subtype='html',
    )
    
    fm = FastMail(mailer)
    await fm.send_message(message,template_name=template)



# def send_email_background(background_tasks: BackgroundTasks, subject: str, email_to: str, body: dict):
#     message = MessageSchema(
#         subject=subject,
#         recipients=[email_to],
#         body=body,
#         subtype='html',
#     )
#     fm = FastMail(conf)
#     background_tasks.add_task(
#        fm.send_message, message, template_name='email.html')