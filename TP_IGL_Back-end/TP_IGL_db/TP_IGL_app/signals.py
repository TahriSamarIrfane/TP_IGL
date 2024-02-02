from django.db.models.signals import post_save
from django.dispatch import receiver 
from .models import Article,Moderateur
from django.core.mail import send_mail
from .utils import *
@receiver(post_save,sender=Article)
def notify_moderators(sender,**kwargs):
    if kwargs['created']:
       moderators=Moderateur.objects.all()
       for moderator in moderators:
          mail_subject = "New article available."
          message = f"Dear {moderator.username},\n\nA new article has been uploaded and is waiting for your review.\n\nBest regards,\nThe Article Review Team"
          email_data = {
            'email_subject': mail_subject,
             'email_body': message,
             'to_email': moderator.email
           }
          send_email(email_data)