import json
from django.conf import settings
from rest_framework.viewsets import ModelViewSet
from elasticsearch import Elasticsearch
from django.conf import settings
import os
from django.shortcuts import render
from .models import Article,Auteur,Institution,UploadedFile
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer,AuteurSerializer,InstitutionSerializer,FileUploadSerializer
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser,MultiPartParser,FormParser
from .extraction_methods import extract_article,extract_entities,extract_info,extract_title
# Create your views here.from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status ,generics
from django.contrib.auth import authenticate, login
from django.http import Http404,HttpResponse , JsonResponse
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
from .models import Profile , create_user_profile , save_user_profile ,  FavoriteArticle ,Article,ModeratorArticle
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
#from .utils import get_existing_article_ids
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

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from elasticsearch import Elasticsearch
from django.conf import settings
from django.shortcuts import render
from .models import Article,Auteur,Institution,UploadedFile,Profile
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer,FileUploadSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser,FormParser
from .extraction_methods import extract_article,extract_entities,extract_info,extract_title,write_to_json
# Create your views here.
from django.core.mail import send_mail
from . import utils 
from .serializers import ProfilePhotoSerializer
from pathlib import Path
import json
import os.path
BASE_DIR1 = Path(__file__).resolve().parent.parent
file_path=os.path.join(BASE_DIR1,'/fichier_es.json')
json_file_path=os.path.abspath('fichier_es.json')

def transforme_institution_to_json(institution):
    dic1={}
    institutions=[]
    for ins in institution:
        dic1={"nom":ins}
        institutions.append(dic1)
    return institutions

def transform_auteur_institution_to_json(auteurs,des_institutions):
    les_institutions=transforme_institution_to_json(des_institutions)
    dic2={}
    les_auteurs=[]
    for auteur in auteurs:
        dic2={"nom":auteur,"institutions":les_institutions}
        les_auteurs.append(dic2)
    return les_auteurs

def create_index(index_nom,map,the_document,the_id):
    es=Elasticsearch('http://localhost:9200')
    if not es.indices.exists(index=index_nom):
        es.indices.create(index=index_nom,mappings=map)
    es.index(index=index_name,id=the_id,body=the_document)

def delete_index(index_nom,the_id):
    es=Elasticsearch('http://localhost:9200')
    es.delete(index=index_name,id=3)        

index_name='index_articles'

mapping = {
        "properties": {
            "auteurs" :{"type":"nested",
                       "properties":{   
                           "id":{"type":"long"},
                           "nom":{"type":"text"},
                           "institutions":{"type":"nested",
                                             "properties":
                                                 { "id":{"type":"long"},
                                                   "nom":{"type":"text"}},
                                          }}},
            "titre": {"type": "text"},
            "abstract":{"type":"text"},
            "references":{"type":"text"},
            "key_words":{"type":"text"},
            "full_text":{"type":"text"},
            "pdf_file":{"type":"text"},
            "publication_date":{"type":"date"}

}
}
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
@login_required
@api_view(['GET'])
def get_articles(request, format=None):
    try:
        # Obtenez tous les articles en attente
        articles_en_attente = Article.objects.filter(etat='A')

        # Sérialisez les articles pour les revoyer en réponse
        serialized_articles = [{"id": article.id, "titre": article.titre, "abstract": article.abstract} for article in articles_en_attente]

        return Response({'articles_en_attente': serialized_articles}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def Article_review(request,id):
    try:
      article=Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response("object doesn't exists",status=status.HTTP_404_NOT_FOUND)
    serializer= ArticleSerializer(article)
    return Response(serializer.data)

@api_view(['PATCH','DELETE'])
def Article_correct_and_remove(request,id):
    try:
        
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    le_id=id
    if request.method == 'PATCH':
        serializer=ArticleSerializer(article,data=request.data)
        if serializer.is_valid():
           serializer.save()
           le_document={
                 "auteurs":serializer.data["auteurs"],
                 "titre": serializer.data['titre'],
                 "abstract":serializer.data['abstract'],
                 "references":serializer.data['references'],
                 "key_words":serializer.data['key_words'],
                 "full_text":serializer.data['full_text'],
                 "pdf_file":serializer.data['pdf_file']
                  }
           try:
                create_index(index_name,mapping,le_document,le_id)
           except:
                print("erreur lors de l'indexation")
                return Response("erreur dans elasticsearch",status=status.HTTP_500_INTERNAL_SERVER_ERROR)
           
           return Response(serializer.data,status=status.HTTP_200_OK)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        article.delete()
        try:
            delete_index(index_name,le_id)
        except:
            print("erreur lors de la suppression de l'index")
        
        return Response(status=status.HTTP_204_NO_CONTENT)


class FileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        
        serializer_f = self.serializer_class(data=request.data)
        
        if serializer_f.is_valid():
            
            serializer_f.save()
            
            file_url=serializer_f.data['uploaded_file']
            
            pdf_file="http://127.0.0.1:8000"+str(file_url)
            
            the_path=str(settings.BASE_DIR)+file_url
            
            titre=extract_title(the_path)
            
            full_text=extract_article(the_path)
            
            abstract=extract_info(the_path,'abstract')
            
            key_words=extract_info(the_path,'keywords')
            
            references=extract_info(the_path,'references')
            
            auteur=[]
            
            institution=[]
            
            extract_entities(full_text,auteur,institution)
            
            les_auteurs=auteur[:4]
           # print(les_auteurs)
            les_institutions=institution[:4]
            
            auteurs=transform_auteur_institution_to_json(les_auteurs,les_institutions)
            json_info={
                "titre": titre,
                "abstract": abstract.replace("\n"," "),
                "key_words": key_words.replace("\n"," "),
                "full_text": full_text.replace("\n"," "),
                "pdf_file": pdf_file,
                "references": references.replace("\n"," "),
                "auteurs":auteurs,
            }
            article_data = {
                "titre": titre,
                "abstract": abstract,
                "key_words": key_words,
                "full_text": full_text,
                "pdf_file": pdf_file,
                "references": references,
                "auteurs":auteurs,
            }
            serializer = ArticleSerializer(data=article_data)
            if serializer.is_valid():
                serializer.save()
                write_to_json(json_info,json_file_path)
                le_id=serializer.data['id']
                le_document={
                 "auteurs":serializer.data['auteurs'],
                 "titre": titre,
                 "abstract":abstract,
                 "references":references,
                 "key_words":key_words.split(),
                 "full_text":full_text,
                 "pdf_file":pdf_file,
                 "publication_date":serializer.data['publication_date']
            }
                
                try:
                    create_index(index_name,mapping,le_document,le_id)
                except:
                    print("erreur lors de l'indexation")
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            serializer_f.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class ProfilePhotoAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class=ProfilePhotoSerializer
    def put(self, request, id, format=None):
        try:
            profile = Profile.objects.get(pk=id)
        
        except Profile.DoesNotExist:
            
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer_f = self.serializer_class(data=request.data)
        
        if serializer_f.is_valid():
            
            serializer_f.save()
            photo=serializer_f.data['uploaded_photo']
            photo_url="http://127.0.0.1:8000"+str(photo)
            setattr(profile,'photo_url',photo_url)
            profile.save()
            url={"photo_url":profile.photo_url}
            return Response('photo successfully changed',status=status.HTTP_200_OK)
        return Response(
            serializer_f.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
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
            article_data = es.get(index=index_name,id=article_id)['_source']
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
#@login_required 
#@permission_classes([IsAuthenticated])
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
    print('old username: {moderator_username}, new username: {new_username}')

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
@api_view(['GET'])
def get_moderator_articles(moderator_id):
    
    try:
        # Recherchez l'instance ModeratorArticle correspondante à l'ID du modérateur
        moderator_article = ModeratorArticle.objects.get(moderator_id=moderator_id)

        # Accédez au tableau elasticsearch_ids
        elasticsearch_ids = moderator_article.elasticsearch_ids

        # Utilisez ces IDs pour récupérer les données des articles correspondants depuis Elasticsearch
        es = Elasticsearch(['http://localhost:9200'])
        index_name = 'index_articles'

        moderator_articles = []
        for article_id in elasticsearch_ids:
            try:
                article_data = es.get(index=index_name, id=article_id)['_source']
                moderator_articles.append(article_data)
            except ElasticsearchException:
                # Gérez le cas où l'article n'existe pas dans Elasticsearch
                pass

        return moderator_articles

    except ModeratorArticle.DoesNotExist:
        # Gérez le cas où il n'y a pas d'entrée ModeratorArticle pour cet ID de modérateur
        return []

    except Exception as e:
        # Imprimez l'exception à des fins de débogage
        print(f'An error occurred: {e}')
        return []

@api_view(['PATCH'])
def changer_etat_article(article_id, moderateur_id):
    try:
        # Rechercher l'instance de ModeratorArticle pour le modérateur donné
        moderator_article = ModeratorArticle.objects.get(moderator_id=moderateur_id)

        # Vérifier si l'article existe déjà dans elasticsearch_ids
        if article_id not in moderator_article.elasticsearch_ids:
            # Ajouter l'article à elasticsearch_ids
            moderator_article.elasticsearch_ids.append(article_id)
            moderator_article.save()

        # Mettre à jour l'état de l'article
        article = Article.objects.get(pk=article_id)
        article.etat = 'C'  # Mettre à jour l'état à "En Cours"
        article.save()

    except ModeratorArticle.DoesNotExist:
        # Si l'instance de ModeratorArticle n'existe pas, la créer
        new_moderator_article = ModeratorArticle.objects.create(
            moderator_id=moderateur_id,
            elasticsearch_ids=[article_id],
        )

        # Mettre à jour l'état de l'article
        article = Article.objects.get(pk=article_id)
        article.etat = 'C'  # Mettre à jour l'état à "En Cours"
        article.save()