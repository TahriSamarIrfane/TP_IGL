from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status ,generics
from django.contrib.auth import authenticate, login
from django.http import HttpResponse , JsonResponse
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
from .models import Profile , create_user_profile , save_user_profile ,  FavoriteArticle ,Article
from . import utils 
from TP_IGL_app.utils import send_email
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from django.shortcuts import render
from elasticsearch import Elasticsearch  # Ajoutez cette ligne
from elasticsearch.exceptions import ElasticsearchException ,  NotFoundError
from django.db.models import Q
from .search.search_indexes import ArticleIndex
from elasticsearch_dsl import Search
from elasticsearch_dsl.connections import connections
from .utils import get_existing_article_ids
from datetime import datetime


ArticleIndex.init()
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

            # Authentification avec Django
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Authentification réussie"})
            else:
                return JsonResponse({"message": "Nom d'utilisateur ou mot de passe incorrect"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Format JSON invalide"}, status=400)

    return JsonResponse({"message": "Méthode non autorisée"}, status=405)

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

#8- test connection of elasticsearch 

def elasticsearch_status_view(request):
    # Initialise Elasticsearch avec l'URL de votre cluster Elasticsearch
    es = Elasticsearch(['http://localhost:9200'])  # Remplacez cela par l'URL de votre cluster

    try:
        # Vérifiez si le cluster est en ligne en faisant une requête simple
        info = es.info()

        # Si la requête réussit, renvoie une réponse JSON
        response_data = {
            'status': 'OK',
            'message': 'Elasticsearch is running smoothly.',
            'elasticsearch_version': info['version']['number'],
        }

    except ElasticsearchException as e:
        # Si une exception se produit, renvoie une réponse JSON avec l'erreur
        response_data = {
            'status': 'Error',
            'message': f'Error connecting to Elasticsearch: {str(e)}',
        }

    return JsonResponse(response_data)
#9- ajouter article prefere 
@csrf_exempt
@permission_classes([IsAuthenticated])
@login_required
def ajouter_article_prefere(request):
    try:
        # Récupérez l'ID de l'utilisateur authentifié
        user_id = request.user.id

        # Récupérez ou créez l'instance FavoriteArticle pour l'utilisateur authentifié
        user_pref, created = FavoriteArticle.objects.get_or_create(user_id=user_id)

        # Récupérez l'ID de l'article à partir du corps de la requête JSON
        body = json.loads(request.body.decode('utf-8'))
        article_id = body.get('id')

        if article_id is None:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'a pas été fourni dans la requête JSON'})

        # Récupérez les IDs de tous les articles dans l'index Elasticsearch
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'article_7'
        print(f'article_id: {article_id}')

        search_query = {
            "query": {
                "match_all": {}
            }
        }

        result = es.search(index=index_name, body=search_query, size=1000)
        existing_article_ids = [hit['_id'] for hit in result['hits']['hits']]

        # Vérifiez si l'ID de l'article existe dans Elasticsearch
        if article_id not in existing_article_ids:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'existe pas dans Elasticsearch'})

        try:
            article_data = es.get(index=index_name, id=article_id)['_source']
        except ElasticsearchException as es_error:
            return JsonResponse({'status': 'Error', 'message': "L'ID de l'article n'existe pas dans Elasticsearch"})

        # Vérifiez si l'article est déjà dans la liste d'articles préférés
        if article_id not in user_pref.elasticsearch_ids:
      # Ajoutez l'ID de l'article à la liste d'articles préférés de l'utilisateur
         user_pref.elasticsearch_ids.append(article_id)
         user_pref.save()


         return JsonResponse({'status': 'OK', 'message': 'Article ajouté aux favoris avec succès'})
        else:
            return JsonResponse({'status': 'Error', 'message': 'Article déjà présent dans les favoris'})

    except Exception as e:
        # Print the exception for debugging purposes
        print(f'An error occurred: {e}')
        return JsonResponse({'status': 'Error', 'message': f'Une erreur s\'est produite: {e}'})
#10- consulter un article prefere
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])
def consulter_articles_preferes(request):
    try:
        # Ensure user is authenticated
        if not request.user.is_authenticated:
            return JsonResponse({'status': 'Error', 'message': 'User not authenticated'})

        # Retrieve the FavoriteArticle instance for the authenticated user
        user_pref, created = FavoriteArticle.objects.get_or_create(user=request.user)

        # Retrieve the list of favorite article IDs from elasticsearch_ids
        favorite_article_ids = user_pref.elasticsearch_ids

        # You can now use the list of article IDs to fetch the corresponding articles
        # For example, using Elasticsearch:
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'article_7'

        favorite_articles = []
        for article_id in favorite_article_ids:
            try:
                article_data = es.get(index=index_name, id=article_id)['_source']
                favorite_articles.append(article_data)
            except ElasticsearchException:
                # Handle the case where the article doesn't exist in Elasticsearch
                pass

        return JsonResponse({'status': 'OK', 'favorite_articles': favorite_articles})

    except Exception as e:
        # Print the exception for debugging purposes
        print(f'An error occurred: {e}')
        return JsonResponse({'status': 'Error', 'message': 'Une erreur s\'est produite'})
#11- view article details 
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])
def afficher_details(request):
    try:
        # Parse JSON data from the request body
        body = json.loads(request.body.decode('utf-8'))
        article_id = body.get('id')

        if article_id is None:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'a pas été fourni dans la requête JSON'})

        # Use Elasticsearch to retrieve details for the specified article ID
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'article_7'

        try:
            article_data = es.get(index=index_name, id=article_id)['_source']
        except Exception as es_exception:
            return JsonResponse({'status': 'Error', 'message': f"Erreur lors de la récupération des détails de l'article : {str(es_exception)}"})

        # Construct and return the response
        details = {
           
            'Titre': article_data.get('title'),
            'Résumé': article_data.get('abstract'),
            'Mots clés': article_data.get('keywords'),
            'Texte intégral': article_data.get('text'),
            'Pdf_url':article_data.get('pdf_url'),
            'Référence':article_data.get('reference'),
            'Date':article_data.get('date') , 
            'Auteurs':article_data.get('auteurs') , 
            'Institution':article_data.get('institution') 
        }

        return JsonResponse({'status': 'OK', 'details': details})

    except Exception as e:
        # Handle other exceptions
        return JsonResponse({'status': 'Error', 'message': f"Une erreur s'est produite : {str(e)}"})
        
#12- view article full_text
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])
def consulter_article_text (request):
     try:
        # Parse JSON data from the request body
        body = json.loads(request.body.decode('utf-8'))
        article_id = body.get('id')

        if article_id is None:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'a pas été fourni dans la requête JSON'})

        # Use Elasticsearch to retrieve details for the specified article ID
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'article_7'

        try:
            article_data = es.get(index=index_name, id=article_id)['_source']
        except Exception as es_exception:
            return JsonResponse({'status': 'Error', 'message': f"Erreur lors de la récupération des détails de l'article : {str(es_exception)}"})

        # Construct and return the response
        details = {
            'Texte intégral': article_data.get('text'),
        }

        return JsonResponse({'status': 'OK', 'details': details})

     except Exception as e:
        # Handle other exceptions
      return JsonResponse({'status': 'Error', 'message': f"Une erreur s'est produite : {str(e)}"})
   
#13- view article pdf 
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])
def consulter_article_pdf(request ):
    try:
        # Parse JSON data from the request body
        body = json.loads(request.body.decode('utf-8'))
        article_id = body.get('id')

        if article_id is None:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'a pas été fourni dans la requête JSON'})

        # Use Elasticsearch to retrieve details for the specified article ID
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'article_7'

        try:
            article_data = es.get(index=index_name, id=article_id)['_source']
        except Exception as es_exception:
            return JsonResponse({'status': 'Error', 'message': f"Erreur lors de la récupération des détails de l'article : {str(es_exception)}"})

        # Construct and return the response
        details = {
            'Pdf': article_data.get('pdf_url'),
        }

        return JsonResponse({'status': 'OK', 'details': details})

    except Exception as e:
        # Handle other exceptions
      return JsonResponse({'status': 'Error', 'message': f"Une erreur s'est produite : {str(e)}"})    

#14- afficher les utilisateurs de notre app 

class AllUsersAPIView(APIView):
    def get(self, request, format=None):
        # Récupérer tous les utilisateurs
        all_users = User.objects.all()

        # Sérialiser les utilisateurs (convertir les objets User en données JSON)
        serialized_users = [{"username": user.username, "email": user.email} for user in all_users]

        # Renvoyer la réponse API
        return Response(serialized_users, status=status.HTTP_200_OK)
#15- rechercher un article 
@csrf_exempt
@login_required 
@permission_classes([IsAuthenticated])
def rechercher_articles(request):
    try:
        # Récupérez les mots-clés à partir du corps de la requête JSON
        body = json.loads(request.body.decode('utf-8'))
        keywords =  body.get('mots_cles')

        if keywords is None:
            return JsonResponse({'status': 'Error', 'message': 'Les mots-clés n\'ont pas été fournis dans la requête JSON'})

        # Debugging statement
        print(f'Search Keywords: {keywords}')

        # Connectez-vous à Elasticsearch
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'article_7'

        # Construisez une requête de recherche Elasticsearch
        search_query = {
            "query": {
                  "bool": {
                #    "should": [{"match": {"keywords": keyword}} for keyword in keywords ]
                #    "should":[ {"match": {"auteurs": keyword}} for keyword in keywords]
                #    "should":[  {"match": {"title": keyword}} for keyword in keywords],
                #    "should":[  {"match": {"text": keyword}} for keyword in keywords],
                 "should": [
                        {"match": {"keywords": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"abstract": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"title": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"text": keyword}} for keyword in keywords
                    ],
   
            "minimum_should_match": 1
        }
    }
}

        # Exécutez la requête de recherche
        result = es.search(index=index_name, body=search_query, size=1000)

        # Récupérez les résultats de la recherche
        search_results = result['hits']['hits']
        
        # Examinez les résultats de la recherche
        for hit in search_results:
            article_data = hit['_source']
            print(f'Elasticsearch Article Data: {article_data}')

        return JsonResponse({'status': 'OK', 'search_results': search_results})

    except Exception as e:
        # Print the exception for debugging purposes
        print(f'An error occurred: {e}')
        return JsonResponse({'status': 'Error', 'message': 'Une erreur s\'est produite lors de la recherche'})


#16- filtrer les resultats par mots_cles 
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])

def filtrer_resultats_key_words(request):
    try:
        # Get keywords from the request body
        body = request.POST or json.loads(request.body.decode('utf-8'))
        keywords = body.get('mots_cles', [])

        # Check if no keywords are provided
        if not keywords:
            return JsonResponse({'status': 'Error', 'message': 'Aucun mot-clé fourni'})

        # Ensure that keywords is a list
        if not isinstance(keywords, list):
            keywords = [keywords]

        # Define your Elasticsearch connection
        es = Elasticsearch(['http://localhost:9200'])

        # Define the search query
        search_query = {
            "query": {
                "bool": {
                    "should": [
                        {"match": {"keywords": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"abstract": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"title": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"text": keyword}} for keyword in keywords
                    ],
                    "minimum_should_match": 1,
                    "filter": [
                        {"terms": {"keywords": keywords}}
                    ]
                }
            }
        }

        # Execute the search
        result = es.search(index='article_7', body=search_query, size=1000)

        # Retrieve search results
        search_results = result['hits']['hits']

        # Examine search results
        for hit in search_results:
            article_data = hit['_source']
            print(f'Elasticsearch Article Data: {article_data}')

        return JsonResponse({'status': 'OK', 'search_results': search_results})

    except Exception as e:
        return JsonResponse({'status': 'Error', 'message': str(e)})

#17- filtrer les resultats par auteurs 
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])

def filtrer_resultats_auteurs(request):
    try:
        # Get keywords from the request body
        body = request.POST or json.loads(request.body.decode('utf-8'))
        keywords = body.get('mots_cles', [])

        # Check if no keywords are provided
        if not keywords:
            return JsonResponse({'status': 'Error', 'message': 'Aucun mot-clé fourni'})

        # Ensure that keywords is a list
        if not isinstance(keywords, list):
            keywords = [keywords]

        # Define your Elasticsearch connection
        es = Elasticsearch(['http://localhost:9200'])

        # Define the search query
        search_query = {
            "query": {
                "bool": {
                    "should": [
                        {"match": {"keywords": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"abstract": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"title": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"text": keyword}} for keyword in keywords
                    ],
                    "minimum_should_match": 1,
                    "filter": [
                        {"terms": {"auteurs": keywords}}
                    ]
                }
            }
        }

        # Execute the search
        result = es.search(index='article_7', body=search_query, size=1000)

        # Retrieve search results
        search_results = result['hits']['hits']

        # Examine search results
        for hit in search_results:
            article_data = hit['_source']
            print(f'Elasticsearch Article Data: {article_data}')

        return JsonResponse({'status': 'OK', 'search_results': search_results})

    except Exception as e:
        return JsonResponse({'status': 'Error', 'message': str(e)})
#18- filtrer les resultats par institution 
@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])

def filtrer_resultats_institution(request):
    try:
        # Get keywords from the request body
        body = request.POST or json.loads(request.body.decode('utf-8'))
        keywords = body.get('mots_cles', [])

        # Check if no keywords are provided
        if not keywords:
            return JsonResponse({'status': 'Error', 'message': 'Aucun mot-clé fourni'})

        # Ensure that keywords is a list
        if not isinstance(keywords, list):
            keywords = [keywords]

        # Define your Elasticsearch connection
        es = Elasticsearch(['http://localhost:9200'])

        # Define the search query
        search_query = {
            "query": {
                "bool": {
                    "should": [
                        {"match": {"keywords": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"abstract": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"title": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"text": keyword}} for keyword in keywords
                    ],
                    "minimum_should_match": 1,
                    "filter": [
                        {"terms": {"institutions": keywords}}
                    ]
                }
            }
        }

        # Execute the search
        result = es.search(index='article_7', body=search_query, size=1000)

        # Retrieve search results
        search_results = result['hits']['hits']

        # Examine search results
        for hit in search_results:
            article_data = hit['_source']
            print(f'Elasticsearch Article Data: {article_data}')

        return JsonResponse({'status': 'OK', 'search_results': search_results})

    except Exception as e:
        return JsonResponse({'status': 'Error', 'message': str(e)})
#19-filtrer les resultats entre deux periode 


@csrf_exempt
@login_required
@permission_classes([IsAuthenticated])
def filtrer_resultats_date(request):
    try:
        # Get keywords and date range from the request body
        body = request.POST or json.loads(request.body.decode('utf-8'))
        keywords = body.get('mots_cles', [])
        start_date_str = body.get('start_date', '')
        end_date_str = body.get('end_date', '')

        # Check if no keywords are provided
        if not keywords:
            return JsonResponse({'status': 'Error', 'message': 'Aucun mot-clé fourni'})

        # Ensure that keywords is a list
        if not isinstance(keywords, list):
            keywords = [keywords]

        # Parse start and end dates
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d') if start_date_str else None
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d') if end_date_str else None

        # Define your Elasticsearch connection
        es = Elasticsearch(['http://localhost:9200'])

        # Define the search query with date range filter
        search_query = {
            "query": {
                "bool": {
                    "should": [
                        {"match": {"keywords": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"abstract": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"title": keyword}} for keyword in keywords
                    ] + [
                        {"match": {"text": keyword}} for keyword in keywords
                    ],
                    "minimum_should_match": 1,
                   
                    "must": [
                        {"range": {"date": {"gte": start_date, "lte": end_date}}}
                    ] if start_date and end_date else []
                }
            }
        }

        # Execute the search
        result = es.search(index='article_7', body=search_query, size=1000)

        # Retrieve search results
        search_results = result['hits']['hits']

        # Examine search results
        for hit in search_results:
            article_data = hit['_source']
            print(f'Elasticsearch Article Data: {article_data}')

        return JsonResponse({'status': 'OK', 'search_results': search_results})

    except Exception as e:
        return JsonResponse({'status': 'Error', 'message': str(e)})