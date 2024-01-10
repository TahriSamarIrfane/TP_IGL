<<<<<<< HEAD
# Generated by Django 5.0 on 2023-12-27 16:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TP_IGL_app', '0006_auteur_institution_alter_favoritearticle_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleAuteur',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.article')),
                ('auteur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.auteur')),
            ],
        ),
        migrations.CreateModel(
            name='InstitutionAuteur',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('auteur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.auteur')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.institution')),
            ],
        ),
    ]
=======
# Generated by Django 5.0 on 2023-12-27 16:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TP_IGL_app', '0006_auteur_institution_alter_favoritearticle_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleAuteur',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.article')),
                ('auteur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.auteur')),
            ],
        ),
        migrations.CreateModel(
            name='InstitutionAuteur',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('auteur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.auteur')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.institution')),
            ],
        ),
    ]
>>>>>>> backendLaouar
