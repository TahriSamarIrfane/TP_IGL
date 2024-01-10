import threading
from django.core.mail import EmailMessage


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        thread = EmailThread(email)
        thread.start()
        thread.join()  # Attend que le thread soit terminé, si nécessaire
        
        
from .models import Article

def get_existing_article_ids():
    return Article.objects.values_list('id', flat=True)
