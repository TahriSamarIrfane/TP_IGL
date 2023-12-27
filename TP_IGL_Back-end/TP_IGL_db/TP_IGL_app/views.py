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
#9- ajouter un article prefere 
@csrf_exempt
@login_required
def ajouter_article_prefere(request):
    user = request.user

    try:
        # Vérifiez si l'utilisateur a déjà une liste d'articles préférés
        user_pref, created = FavoriteArticle.objects.get_or_create(user=user)

        # Récupérez l'ID de l'article à partir du corps de la requête JSON
        body = json.loads(request.body.decode('utf-8'))
        article_id = body.get('id')

        if article_id is None:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'a pas été fourni dans la requête JSON'})

        # Récupérez l'article de la base de données Elasticsearch
        es = Elasticsearch(['http://localhost:9200'])
        article_data = es.get(index='votre_index', id=article_id)['_source']

        # Vérifiez si l'article est déjà dans la liste d'articles préférés
        if not user_pref.articles.filter(id=article_id).exists():
            # Ajoutez l'ID de l'article à la liste d'articles préférés de l'utilisateur
            article = Article.objects.get(id=article_id)
            user_pref.articles.add(article)
            user_pref.save()

            return JsonResponse({'status': 'OK', 'message': 'Article ajouté aux favoris avec succès'})
        else:
            return JsonResponse({'status': 'Error', 'message': 'Article déjà présent dans les favoris'})

    except ElasticsearchException:
        return JsonResponse({'status': 'Error', 'message': 'Article non trouvé dans Elasticsearch'}) 
    
#10- consulter un article prefere
@csrf_exempt
@login_required
def consulter_articles_prefere(request):
    user = request.user

    try:
        # Récupérez la classe des articles préférés de l'utilisateur
        user_pref = FavoriteArticle.objects.get(user=user)

        # Vérifiez si la classe d'articles préférés a des articles
        if user_pref.articles.exists():
            # Récupérez les IDs des articles préférés
            article_ids = list(user_pref.articles.values_list('id', flat=True))

            # Connexion à Elasticsearch
            es = Elasticsearch(['http://localhost:9200'])

            # Récupérez les articles d'Elasticsearch en utilisant les IDs
            es_response = es.mget(index='votre_index', body={'ids': article_ids})

            # Vérifiez si des articles ont été récupérés
            if 'docs' in es_response and any(es_response['docs']):
                articles = [doc['_source'] for doc in es_response['docs']]
                return JsonResponse({'status': 'OK', 'articles': articles})
            else:
                return JsonResponse({'status': 'Error', 'message': 'Aucun article trouvé dans Elasticsearch'})

        else:
            return JsonResponse({'status': 'OK', 'message': 'Aucun article préféré'})

    except FavoriteArticle.DoesNotExist:
        return JsonResponse({'status': 'Error', 'message': 'Aucun article préféré'})

    except NotFoundError:
        return JsonResponse({'status': 'Error', 'message': 'Erreur lors de la récupération des articles dans Elasticsearch'})


#11- view article details 
@csrf_exempt
@login_required
def afficher_details(self):
        details = {
            'ID': self.id,
            'Titre': self.titre,
            'Résumé': self.abstract,
            'Mots clés': self.key_words,
            'Texte intégral': self.full_text,
            'URL PDF': self.pdf_url,
            'Références': self.references,
            'Date': self.date,
            'État': self.etat.nom,  # Supposons que le champ 'nom' existe dans le modèle Etat
            'Modérateur': self.moderateur.nom_complet(),  # Supposons que le modèle Moderateur a une méthode 'nom_complet'
            'Admin': self.admin.nom_complet()  # Supposons que le modèle Admin a une méthode 'nom_complet'
        }

        return details

#12- view article full_text 
def consulter_article_text (request, article_id):
    article = get_object_or_404(Article, id=article_id)
    response_data = {
        'full_text': article.full_text,
    }
    return JsonResponse(response_data)

#13- view article pdf 
@csrf_exempt
@login_required
def consulter_article_pdf(request, article_id):
    article = get_object_or_404(Article, id=article_id)

    # Assurez-vous d'adapter cet exemple en fonction de la façon dont votre modèle stocke les fichiers PDF
    pdf_content = article.pdf.read()

    response = HttpResponse(pdf_content, content_type='application/pdf')
    response['Content-Disposition'] = f'filename="{article.title}.pdf"'

    return response  

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
def rechercher_articles(request):
    # Assurez-vous que les mots clés sont fournis par l'utilisateur
    mots_cles = request.GET.get('mots_cles', '').split()

    # Si aucun mot-clé n'est fourni, retournez une réponse vide
    if not mots_cles:
        return JsonResponse({'status': 'Error', 'message': 'Aucun mot-clé fourni'})

    # Créez une requête Q pour rechercher dans le titre, les mots-clés, les auteurs et le texte intégral
    recherche_query = Q()
    for mot_cle in mots_cles:
        recherche_query |= Q(titre__icontains=mot_cle) | \
                           Q(mots_cles__icontains=mot_cle) | \
                           Q(auteurs__icontains=mot_cle) | \
                           Q(full_text__icontains=mot_cle)

    # Recherchez les articles qui correspondent aux critères de recherche et triez par date de création (du plus récent au moins récent)
    articles_recherches = Article.objects.filter(recherche_query).order_by('-date_creation')

    # Construisez la réponse JSON avec les résultats
    resultats = []
    for article in articles_recherches:
        resultats.append({
            'id': article.id,
            'titre': article.titre,
            'mots_cles': article.mots_cles,
            'auteurs': article.auteurs,
            'full_text': article.full_text,
            'date_creation': article.date_creation.strftime('%Y-%m-%d'),  # Format de date si nécessaire
        })

    return JsonResponse({'status': 'OK', 'resultats': resultats})
#16- filtrer les resultats 
@csrf_exempt
@login_required

def filtrer_resultats(cls, mots_cles=None, auteurs=None, institutions=None, date_debut=None, date_fin=None):
        queryset = cls.objects.all()

        if mots_cles:
            # Filtrer par mots clés
            queryset = queryset.filter(key_words__icontains=mots_cles)

        if auteurs:
            # Filtrer par auteurs
            queryset = queryset.filter(moderateur__nom_complet__icontains=auteurs) | queryset.filter(admin__nom_complet__icontains=auteurs)

        if institutions:
            # Filtrer par institutions
            queryset = queryset.filter(moderateur__institution__icontains=institutions) | queryset.filter(admin__institution__icontains=institutions)

        if date_debut:
            # Filtrer par date de début
            queryset = queryset.filter(date__gte=date_debut)

        if date_fin:
            # Filtrer par date de fin
            queryset = queryset.filter(date__lte=date_fin)

        return queryset
    
@csrf_exempt
@login_required
def supprimer_article(request):
    try:
        # Charger le corps de la requête JSON
        body = json.loads(request.body.decode('utf-8'))

        # Vérifier si l'ID de l'article est fourni dans le corps de la requête JSON
        article_id = body.get('id')

        if article_id is None:
            return JsonResponse({'status': 'Error', 'message': 'L\'ID de l\'article n\'a pas été fourni dans le corps de la requête JSON'})

        # Vérifier si l'article existe dans la base de données
        article = Article.objects.get(pk=article_id)

        # Supprimer l'article de la base de données
        article.delete()

        # Supprimer l'article de l'index Elasticsearch
        es = Elasticsearch(['http://localhost:9200'])
        es.delete(index='votre_index', id=article_id)

        return JsonResponse({'status': 'OK', 'message': 'Article supprimé avec succès'})

    except Article.DoesNotExist:
        return JsonResponse({'status': 'Error', 'message': 'Article non trouvé dans la base de données'})

    except ElasticsearchException:
        return JsonResponse({'status': 'Error', 'message': 'Article non trouvé dans Elasticsearch'})

