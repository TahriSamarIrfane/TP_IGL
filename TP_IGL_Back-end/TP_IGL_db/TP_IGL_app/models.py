from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import  Group, Permission
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Model
from django.core.validators import FileExtensionValidator
# Create your models here.
# models.py

 # 1- modele d'utilisateur 
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True, through='UserGroup')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True, through='UserPermission')

class UserGroup(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

class UserPermission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
#2- modele etat     
class Etat(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)  # 'En Attente', 'En Cours', 'Terminé'

    def __str__(self):
        return self.nom
#3- modele moderateur 
class Moderateur(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='admin_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='admin_user_permissions', blank=True)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username
#4- modele de admin 
class Admin(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='moderateur_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='moderateur_user_permissions', blank=True)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username

#5- modele auteur 

class Institution(Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom
class Auteur(Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    institutions = models.ManyToManyField(Institution, related_name='institutions')

    def __str__(self):
        return self.nom
# Create your models here.

class UploadedFile(Model):
    id = models.BigAutoField(primary_key=True)
    uploaded_file = models.FileField(upload_to='./',validators=[FileExtensionValidator()])
    def __str__(self):
        return self.id
    
#8- article prefere 
class FavoriteArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    elasticsearch_ids = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"Favoris de {self.user.username}"
#9- modele article 
class Article(Model):
    id = models.BigAutoField(primary_key=True)
    titre = models.CharField(max_length=255,blank=True)
    abstract = models.TextField(blank=True)
    key_words = models.TextField(blank=True)
    full_text = models.TextField()
    pdf_file = models.URLField()
    references = models.TextField(blank=True)
    publication_date = models.DateField(auto_now_add=True)
    auteurs = models.ManyToManyField(Auteur ,related_name='authors')
    
    EN_ATTENTE='A'
    EN_COURS='C'
    TERMINE='T'
    Etat_choix=[
        (EN_ATTENTE,'En_Attente'),
        (EN_COURS,'En_Cours'),
        (TERMINE,'Terminé'),
    ]
    
    etat = models.CharField(max_length=1,choices=Etat_choix,default=EN_ATTENTE) #etat de l'article
   
    def __str__(self):
        return self.titre 
    
    def state_to_string(self):
        if self.etat=='A':
            return 'En Attente'
        elif self.etat=='C':
            return 'En Cours'
        else:
            return 'Terminé' 
    def get_all_institutions(self):
        return [auteur.institution for auteur in self.auteurs.all()]  
#10- modele articleauteur 
#11- modele profile 
class ProfilePhoto(Model):
    id = models.BigAutoField(primary_key=True)
    uploaded_photo=models.ImageField(upload_to='./photo_profile')



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reset_code = models.CharField(max_length=32, blank=True, null=True)
    username = models.CharField(max_length=255, default='')   
    email = models.EmailField(default='')
    photo_url = models.URLField(blank=True, null=True)
 
    def __str__(self):
        return self.username    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
    