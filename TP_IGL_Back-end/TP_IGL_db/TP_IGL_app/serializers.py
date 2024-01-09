# TP_IGL_app/serializers.py

from rest_framework import serializers
from django_elasticsearch_dsl import Document, fields
from .models import CustomUser


class ChangePasswordSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class RequestPasswordResetCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    reset_code = serializers.CharField()
    new_password = serializers.CharField()
    
    
class VotreModeleIndex(Document):
    class Index:
        name = 'votre_modele_index'
        settings = {
            "number_of_shards": 1,
        }

    field_1 = fields.TextField(
        analyzer='french',
        fields={'raw': fields.KeywordField()}
    )
    field_2 = fields.KeywordField()

class PasswordGeneratorSerializer(serializers.Serializer):
    generated_password = serializers.CharField(max_length=12)


class ModeratorCreationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()