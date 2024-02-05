from . import views 
from django.urls import path 
from .views import AllUsersAPIView
from django.contrib import admin
from .views import LoginPage ,LogoutPage , change_password , change_username , delete_account , signup_page ,reset_password , request_password_reset_code , home
from .views import *

urlpatterns = [
    path('',home, name='home'),
    path('signup/', signup_page, name='signup'),
    path('login/',LoginPage, name='login'),
    path('logout/', LogoutPage, name='logout'), 
    path('delete-account/', delete_account , name ='delete-account') , 
    path('change-username/', change_username, name='change_username'),
    path('change-password/', change_password, name='change_password'),
    path('request-password-reset/', request_password_reset_code, name='request-password-reset'),
    path('reset-password/', reset_password, name='reset-password'), 

    #path('elasticsearch_status/', elasticsearch_status_view, name='elasticsearch_status'),
    #path('ajouter_article_prefere/', ajouter_article_prefere, name='ajouter_article_prefere'),
    #path('consulter_articles_preferes/',consulter_articles_preferes,name='consulter_articles_preferes'),
    #path('consulter_article_pdf/', consulter_article_pdf,name=' consulter_article_pdf'),
    #path('consulter_article_text/',consulter_article_text,name='consulter_article_text'),
    #path('afficher_details/',afficher_details,name='afficher_details'),
    #path('rechercher_articles/', rechercher_articles, name='rechercher_articles'),
    #path('filtrer_resultats_key_words/',filtrer_resultats_key_words,name='filtrer_resultats_key_words'),
    #path('filtrer_resultats_auteurs/',filtrer_resultats_auteurs,name='filtrer_resultats_auteurs'),
    #path('filtrer_resultats_institution/',filtrer_resultats_institution,name='filtrer_resultats_institution'),
    #path('filtrer_resultats_date/',filtrer_resultats_date,name='filtrer_resultats_date'),
    
    path('upload-file/',FileUploadAPIView.as_view(),name='upload-file'),
    path('moder/<int:id>/',Article_correct_and_remove,name='moderator-page'),
    path('moder/<int:id>/get/',Article_review,name='moderateur-page-int'),
    path('get-articles/',get_articles,name='get-articles'),

    path('generate-password/',generate_random_password_view, name='generate-password'),
    path('create-moderator/',create_moderator_view, name='create-moderator'),
    path('remove-moderator/',remove_moderator_view, name='remove-moderator'),
    path('modify_moderator_username/',modify_moderator_username, name='modify_moderator_username'),
    path('modify_moderator_password/',modify_moderator_password, name='modify_moderator_password'),
    path('change_moderator_username/',change_moderator_username, name='change_moderator_username'),
    path('change_moderator_password/',change_moderator_password, name='change_moderator_password'),
    path('submit-feedback/', submit_feedback, name='submit-feedback'),
    path('contact/',contact_view,name='contact'),
    path('contact-us/', contact_us, name='contact-us'),
    path('ajouter_article_prefere/', ajouter_article_prefere, name='ajouter_article_prefere'),
    path('consulter_articles_preferes/',consulter_articles_preferes,name='consulter_articles_preferes'),
    path('consulter_article_pdf/', consulter_article_pdf,name=' consulter_article_pdf'),
    path('consulter_article_text/',consulter_article_text,name='consulter_article_text'),
    path('afficher_details/',afficher_details,name='afficher_details'),
    path('rechercher_articles/', rechercher_articles, name='rechercher_articles'),
    path('filtrer_resultats_key_words/',filtrer_resultats_key_words,name='filtrer_resultats_key_words'),
    path('filtrer_resultats_auteurs/',filtrer_resultats_auteurs,name='filtrer_resultats_auteurs'),
    path('filtrer_resultats_institution/',filtrer_resultats_institution,name='filtrer_resultats_institution'),
    path('filtrer_resultats_date/',filtrer_resultats_date,name='filtrer_resultats_date'),
    path('GetArticlesEnAttente/',get,name='GetArticlesEnAttente'), 
    path('create_article/',create_article,name='create_article'),
    path('get_article_details/<int:article_id>/', views.get_article_details, name='get_article_details'),
    path('get-moder-articles/',get_moderator_articles,name='get-moder-articles'),
    path('modify-pohto/<int:id>/',ProfilePhotoAPIView.as_view(),name='modify-photo'),
    path('change-etat/',changer_etat_article,name='change-etat')
    
]

    


    

