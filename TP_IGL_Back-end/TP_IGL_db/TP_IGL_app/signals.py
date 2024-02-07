from django.db.models.signals import post_save
from django.dispatch import receiver 
from .models import Article,Moderateur
from django.core.mail import send_mail
from .utils import send_email_to_moderator

@receiver(post_save,sender=Article)
def notify_moderators(sender,**kwargs):
   if kwargs['created']:
       moderators=Moderateur.objects.all()
       for moderator in moderators:
          send_email_to_moderator(moderator.email,moderator.username)
