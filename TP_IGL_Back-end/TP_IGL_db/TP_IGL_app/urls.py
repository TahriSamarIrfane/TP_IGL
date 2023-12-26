from . import views 
from django.urls import path 
from .views import AllUsersAPIView
from django.contrib import admin
from .views import LoginPage ,LogoutPage , change_password , change_username , delete_account , signup_page ,reset_password , request_password_reset_code , home


urlpatterns = [
    path('',home, name='home'),
    path('signup/', signup_page, name='signup'),
    path('login/',LoginPage, name='login'),
    path ('logout/', LogoutPage, name='logout'), 
    path('delete-account/', delete_account , name ='delete-account') , 
    path('change-username/', change_username, name='change_username'),
    path('change-password/', change_password, name='change_password'),
    path('request-password-reset/', request_password_reset_code, name='request-password-reset'),
    path('reset-password/', reset_password, name='reset-password'), 
]
