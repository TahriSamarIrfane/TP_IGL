import threading
from django.core.mail import EmailMessage
import secrets
import string
from django.core.mail import send_mail
from django.contrib.auth.models import Group
from .serializers import ModeratorCreationSerializer
from .models import Moderateur
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import transaction


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
        
"""        
from .models import Article


def get_existing_article_ids():
    return Article.objects.values_list('id', flat=True)
"""

def generate_random_password():
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for _ in range(12))
    return password

@csrf_exempt
def create_moderator(data):
    serializer = ModeratorCreationSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    
    email = serializer.validated_data['email']

    # Validate the email using validate_email
    try:
        validate_email(email)
    except ValidationError:
        raise ValidationError({'email': ['Invalid email address.']})

    username = serializer.validated_data['username']
    email = serializer.validated_data['email']

     # Check if the email is already in use
    if Moderateur.objects.filter(email=email).exists():
        raise ValidationError({'email': ['This email is already in use.']})

    # Check if the username is already in use
    if Moderateur.objects.filter(username=username).exists():
        raise ValidationError({'username': ['This username is already in use.']})

    password = generate_random_password()
    moderator = Moderateur.objects.create_user(username=username, email=email, password=password)

    # Add the moderator to the appropriate group
    # Assume moderator_user is the moderator user object
    group_name = 'moderateur_groups'

    # Get or create the group
    group, created = Group.objects.get_or_create(name=group_name)

    # Add the user to the group
    moderator.groups.add(group)

    moderator.save()

    # Print statements for debugging
    print(f'Moderator added to the database with username: {username}, email: {email}')

    # Send an email to the moderator with the information
    subject = 'Informations du modérateur'
    message = f'Bonjour {username},\n\nVous avez été ajouté en tant que modérateur.\n\nUsername: {username}\nPassword: {password}'
    from_email = 'lh_bayadh@esi.dz'  # Replace with our website email
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)

def remove_moderator(username):
    try:
        moderator = Moderateur.objects.get(username=username)
         # Print statements for debugging
        print(f'Moderator to remove from the database with username: {username} ?')

        with transaction.atomic():
            # Remove the moderator from all groups
            moderator.groups.clear()

            # Update articles to set the moderator to None
           # Article.objects.filter(moderateur=moderator).update(moderateur=None)

            # Delete the moderator
            moderator.delete()
         # Print statements for debugging
        print(f'Moderator removed from the database with username: {username}')
        return True
    except Moderateur.DoesNotExist:
        return False