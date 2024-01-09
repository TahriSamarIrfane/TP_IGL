from django.urls import path 
from django.contrib import admin
from .views import LoginPage ,LogoutPage , change_password , change_username , delete_account , signup_page ,reset_password , request_password_reset_code , home , generate_random_password_view
from .views import create_moderator_view,remove_moderator_view,modify_moderator_username,modify_moderator_password,change_moderator_username,change_moderator_password
from .views import submit_feedback,contact_us

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
    path('generate-password/',generate_random_password_view, name='generate-password'),
    path('create-moderator/',create_moderator_view, name='create-moderator'),
    path('remove-moderator/',remove_moderator_view, name='remove-moderator'),
    path('modify_moderator_username/',modify_moderator_username, name='modify_moderator_username'),
    path('modify_moderator_password/',modify_moderator_password, name='modify_moderator_password'),
    path('change_moderator_username/',change_moderator_username, name='change_moderator_username'),
    path('change_moderator_password/',change_moderator_password, name='change_moderator_password'),
    path('submit-feedback/', submit_feedback, name='submit-feedback'),
    path('contact-us/', contact_us, name='contact-us'),
]
    

