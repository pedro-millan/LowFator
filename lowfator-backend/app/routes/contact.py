from fastapi import APIRouter
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

router = APIRouter()


class ContactMessage(BaseModel):
    email: str
    message: str


@router.post("/contact")
async def send_contact_email(data: ContactMessage):
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    contact_to = os.getenv("CONTACT_EMAIL_TO", "")

    if not smtp_user or not smtp_password or not contact_to:
        return {
            "success": False,
            "message": "Email service not configured. Check environment variables."
        }

    try:
        msg = MIMEMultipart()
        msg["From"] = smtp_user
        msg["To"] = contact_to
        msg["Subject"] = f"[Lowfator] New message from {data.email}"

        body = f"""New message received from the Lowfator contact form.

From: {data.email}

Message:
{data.message}

---
This message was sent from lowfator.com
"""
        msg.attach(MIMEText(body, "plain", "utf-8"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.ehlo()
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, contact_to, msg.as_string())

        return {"success": True, "message": "Message sent successfully."}

    except smtplib.SMTPAuthenticationError:
        print("Contact email: SMTP authentication error")
        return {"success": False, "message": "Authentication error with the mail server."}
    except Exception as e:
        print(f"Contact email error: {e}")
        return {"success": False, "message": "Could not send the message. Please try again."}
