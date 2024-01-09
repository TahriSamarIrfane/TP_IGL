from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status ,generics
from django.contrib.auth import authenticate, login
from django.http import Http404, HttpResponse , JsonResponse
import json
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, update_session_auth_hash
from .serializers import ChangePasswordSerializer
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.http import JsonResponse
import requests
import re
from rest_framework.authentication import BasicAuthentication 
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseServerError
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
import traceback
from django.contrib.auth import get_user_model
import random
import string
from django.core.mail import send_mail
import secrets
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import RequestPasswordResetCodeSerializer, ResetPasswordSerializer
from django.db import models
#from .models import Profile , create_user_profile , save_user_profile ,  FavoriteArticle ,Article
from . import utils 
from TP_IGL_app.utils import send_email
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from django.shortcuts import render
from django.db.models import Q
#from .utils import get_existing_article_ids
from datetime import datetime
import secrets
import string
from django.core.mail import send_mail
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import generate_random_password
from .serializers import PasswordGeneratorSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import create_moderator
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from .utils import remove_moderator
from .models import Moderateur
from django.views.decorators.csrf import csrf_protect
from .forms import ContactForm


# authentification google 
def authenticate_google(request):
    # Configure the OAuth flow
    flow = InstalledAppFlow.from_client_secrets_file(
        'path/to/client_secret.json',  # Replace with the path to your client_secret.json file
        scopes=['https://www.googleapis.com/auth/gmail.send']
    )

    # Run the OAuth flow and get the credentials
    credentials = flow.run_local_server(port=0)

    # Save the credentials for later use
    with open('path/to/token.json', 'w') as token_file:  # Replace with the path to your token.json file
        token_file.write(credentials.to_json())

    return HttpResponse("Authentication successful!")

# Create your views here.
def home(request):
    return render(request,'home.html')

# 1- foction sign up 

CustomUser = get_user_model()
@csrf_exempt
def signup_page(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            uname = data.get('username')
            email = data.get('email')
            pass1 = data.get('password1')
            pass2 = data.get('password2')

            # Vérifier l'unicité du pseudo
            if CustomUser.objects.filter(username=uname).exists():
                return JsonResponse({"error": "This username is already taken"}, status=400)

            # Vérifier si l'e-mail est valide
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return JsonResponse({"error": "Invalid email address"}, status=400)

            # Vérifier si l'e-mail existe déjà dans la base de données
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({"error": "This email is already registered"}, status=400)

            if pass1 != pass2:
                return JsonResponse({"error": "Your password and confirm password are not the same!!"}, status=400)

            my_user = CustomUser.objects.create_user(uname, email, pass1)
            my_user.save()

            return JsonResponse({"success": "User created successfully!"}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# 2- fonction se connecter 

@csrf_exempt
def LoginPage(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')

            # Authentication with Django
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)

                if is_moderator(user):
                    return JsonResponse({"message": "Authentication successful. User is a moderator."})
                else:
                    return JsonResponse({"message": "Authentication successful. User is not a moderator."})

            else:
                return JsonResponse({"message": "Invalid username or password"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)

# Decorator to check if the user is a moderator
def is_moderator(user):
    return user.is_authenticated and user.groups.filter(name='Moderator').exists()

# 3- deconnnexion de l'utilisateur 

@csrf_exempt
@login_required
def LogoutPage(request):
    if request.method == 'POST':
        try:
            # Déconnexion de l'utilisateur
            logout(request)
            return JsonResponse({"message": "Déconnexion réussie"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée"}, status=405)

#4- modifier le mot de pass 

@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
@login_required
def change_password(request):
    current_user = request.user
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')

        # Verify the old password
        if not current_user.check_password(old_password):
            return Response({'message': 'Ancien mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        # Change the password
        current_user.set_password(new_password)
        current_user.save()

        # Update the authenticated session
        update_session_auth_hash(request, current_user)

        return Response({'message': 'Mot de passe modifié avec succès'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# 5- modifier user name 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_username(request):
    current_user = request.user
    new_username = request.data.get('new_username')

    # Vérifier si le nouveau pseudonyme est déjà pris
    if User.objects.filter(username=new_username).exists():
        return Response({'message': 'Ce pseudonyme est déjà pris'}, status=status.HTTP_400_BAD_REQUEST)

    # Changer le pseudonyme
    current_user.username = new_username
    current_user.save()

    return Response({'message': 'Pseudonyme modifié avec succès'}, status=status.HTTP_200_OK)


#6 - supprimer un compte 

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        current_user = request.user

        # Supprimer l'utilisateur
        current_user.delete()

        return Response({'message': 'Compte utilisateur supprimé avec succès'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# 7- Mot de passe  oublie 

@csrf_exempt
def request_password_reset_code(request):
    data = json.loads(request.body)
    email = data.get('email')

    if email:
        user = get_object_or_404(User, email=email)

        # Assurez-vous que l'utilisateur a un objet Profile associé
        profile, created = Profile.objects.get_or_create(user=user)

        # Générez un code de réinitialisation
        reset_code = secrets.token_hex(16)
       
        # Enregistrez le code de réinitialisation dans le modèle Profile
        profile.reset_code = reset_code
        profile.save()

        # Envoyez le code de réinitialisation par e-mail
        email_data = {
            'email_subject': 'Code de réinitialisation du mot de passe',
            'email_body': f'Votre code de réinitialisation du mot de passe est {reset_code}',
            'to_email': user.email
        }

        utils.send_email(email_data)

        return JsonResponse({'message': 'Code de réinitialisation envoyé avec succès.'})
    else:
        return JsonResponse({'message': 'Adresse e-mail non fournie.'}, status=400)

@csrf_exempt
def reset_password(request):
    # Charger les données JSON depuis le corps de la requête
    data = json.loads(request.body)
    email = data.get('email')
    reset_code = data.get('reset_code')
    new_password = data.get('new_password')

    try:
        # Recherchez l'utilisateur par adresse e-mail
        user = User.objects.get(email=email)

        try:
            # Vérifiez si l'utilisateur a un profil
            profile = user.profile

            # Vérifier le code de réinitialisation
            if profile.reset_code != reset_code:
                return JsonResponse({'message': 'Code de réinitialisation invalide.'}, status=400)

            # Mettre à jour le mot de passe
            user.set_password(new_password)
            user.save()

            return JsonResponse({'message': 'Mot de passe réinitialisé avec succès.'})
        except ObjectDoesNotExist:
            return JsonResponse({'message': 'L\'utilisateur n\'a pas de profil associé.'}, status=400)

    except User.DoesNotExist:
        return JsonResponse({'message': 'Aucun utilisateur trouvé avec cette adresse e-mail.'}, status=400)

# 8- Generer un mot de passe aleatoirement  
@csrf_exempt
@api_view(['GET'])
def generate_random_password_view(request):
    generated_password = generate_random_password()
    serializer = PasswordGeneratorSerializer(data={'generated_password': generated_password})

    if serializer.is_valid():
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)
    
@csrf_exempt
@api_view(['POST'])
def create_moderator_view(request):
    if request.method == 'POST':
         try:
            create_moderator(request.data)
            return Response({'message': 'Moderator created successfully'}, status=201)
         except ValidationError as e:
            error_messages = {}
            for field, errors in e.message_dict.items():
                error_messages[field] = [str(error) for error in errors]
            return Response({'errors': error_messages}, status=status.HTTP_400_BAD_REQUEST)
         

@csrf_exempt
@api_view(['POST'])
def remove_moderator_view(request):
    if request.method == 'POST':
        username_to_remove = request.data.get('username', None)

        if username_to_remove:
            try:
                removed = remove_moderator(username_to_remove)

                if removed:
                    return Response({'message': 'Moderator removed successfully'}, status=200)
                else:
                    return Response({'error': 'Moderator not found'}, status=404)
            except Http404:
                return Response({'error': 'Moderator not found'}, status=404)
        else:
            return Response({'error': 'Please provide a username to remove'}, status=400)
        

#En verifiant si le moderateur est authentifie (dans le cas ou c'est le moderateur lui même qui va le modifier)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def modify_moderator_password(request):
    current_moderator = request.user
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')

        # Verify the old password
        if not current_moderator.check_password(old_password):
            return Response({'message': 'Ancien mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        # Change the password
        current_moderator.set_password(new_password)
        current_moderator.save()

        # Update the authenticated session
        update_session_auth_hash(request, current_moderator)

        return Response({'message': 'Mot de passe modifié avec succès'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#En verifiant si le moderateur est authentifie (dans le cas ou c'est le moderateur lui même qui va le modifier)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def modify_moderator_username(request):
    current_moderator = request.user
    new_username = request.data.get('new_username')

    # Vérifier si le nouveau pseudonyme est déjà pris
    if Moderateur.objects.filter(username=new_username).exclude(id=current_moderator.id).exists():
        return Response({'message': 'Ce pseudonyme est déjà pris'}, status=status.HTTP_400_BAD_REQUEST)

    # Changer le pseudonyme
    current_moderator.username = new_username
    current_moderator.save()

    return Response({'message': 'Pseudonyme modifié avec succès'}, status=status.HTTP_200_OK)


#Sans verifier si le moderateur est authentifie (dans le cas ou c'est l'admin qui va le modifier)
@api_view(['POST'])
def change_moderator_password(request):
    moderator_username = request.data.get('moderator_username')
    moderator = get_object_or_404(Moderateur, username=moderator_username)

    new_password = request.data.get('new_password')
    moderator.set_password(new_password)
    moderator.save()
    # Print statements for debugging
    print(f'username: {moderator_username}, new password: {new_password}')

    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)


#Sans verifier si le moderateur est authentifie (dans le cas ou c'est l'admin qui va le modifier)
@api_view(['POST'])
def change_moderator_username(request):
    moderator_username = request.data.get('moderator_username')
    moderator = get_object_or_404(Moderateur, username=moderator_username)

    new_username = request.data.get('new_username')
    moderator.username = new_username
    moderator.save()
    # Print statements for debugging
    print(f'old username: {moderator_username}, new username: {new_username}')

    return Response({'message': 'Username changed successfully'}, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@login_required
def submit_feedback(request):
    try:
        user = request.user
        stars = request.data.get('stars')
        comment = request.data.get('comment')

        # Validate stars and comment
        if stars is None or not (0 <= stars <= 5):
            return JsonResponse({'error': 'Invalid stars value'}, status=400)

        # Sending email
        subject = 'Feedback from User'
        message = f"Stars: {stars}\nComment: {comment}\nUser: {user.username}\nEmail: {user.email}"
        from_email = 'boutheynalaouar7@gmail.com'  # Replace with your email
        to_email = 'lb_laouar@esi.dz'  # Replace with the destination email
        send_mail(subject, message, from_email, [to_email])

        return JsonResponse({'message': 'Feedback submitted successfully'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_protect
@api_view(['POST'])
@permission_classes([AllowAny])
def contact_us(request):
    try:
        name = request.data.get('nom')
        email = request.data.get('email')
        message = request.data.get('message')

       # Validate name, email, and message
        if not name or not email or not message:
            return JsonResponse({'error': 'Name, email, and message are required fields'}, status=400)

        # Sending email
        subject = 'Contact Support'
        message = f"Nom: {name}\nMessage: {message}\nEmail: {email}"
        from_email = 'boutheynalaouar7@gmail.com'  # Replace with your email
        to_email = 'lb_laouar@esi.dz'  # Replace with the destination email
        send_mail(subject, message, from_email, [to_email])

        return JsonResponse({'message': 'Message submitted successfully'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)