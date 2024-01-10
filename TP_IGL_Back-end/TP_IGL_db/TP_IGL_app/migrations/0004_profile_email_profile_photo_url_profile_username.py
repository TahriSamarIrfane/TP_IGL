# Generated by Django 5.0 on 2023-12-26 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TP_IGL_app', '0003_etat_admin_moderateur_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
        migrations.AddField(
            model_name='profile',
            name='photo_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='username',
            field=models.CharField(default='', max_length=255),
        ),
    ]
