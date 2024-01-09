from django.db import migrations, models
import django


def copy_date_values(apps, schema_editor):
    Article = apps.get_model('TP_IGL_app', 'Article')
    for article in Article.objects.all():
        article.new_date_field = article.date
        article.save()

class Migration(migrations.Migration):

    dependencies = [
        ('TP_IGL_app', '0010_alter_admin_options_alter_moderateur_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='new_date_field',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.RunPython(copy_date_values),
    ]
