# Generated by Django 5.0 on 2024-01-04 17:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TP_IGL_app', '0016_delete_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfeedback',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TP_IGL_app.customuser'),
        ),
    ]
