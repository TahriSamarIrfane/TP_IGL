# TP_IGL_app/serializers.py
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django_elasticsearch_dsl import Document, fields

from .models import Article,Auteur,Institution,UploadedFile
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
    
    
    
class InstitutionSerializer(ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'
class AuteurSerializer(ModelSerializer):
    institutions=InstitutionSerializer(many=True)
    class Meta:
        model = Auteur
        fields ='__all__'
    def create(self, validated_data):
        institutions_data = validated_data.pop('institutions', [])

        # Create Auteur instance
        auteur = Auteur.objects.create(**validated_data)

        # Create Institution instances and associate them with the Auteur
        for institution_data in institutions_data:
            institution,created=Institution.objects.get_or_create(**institution_data)
            auteur.institutions.add(institution)
        return auteur
    def update(self, instance, validated_data):
        institutions_data = validated_data.pop('institutions', [])

        # Update Auteur instance fields
        instance.nom = validated_data.get('nom', instance.nom)
        # Update other fields as needed
        instance.save()

        # Update or create Institution instances
        for institution_data in institutions_data:
            institution_id = institution_data.get('id', None)

            if institution_id:
                institution = Institution.objects.get(id=institution_id)
                # Update Institution instance fields
                institution.nom = institution_data.get('nom', institution.nom)
                # Update other fields as needed
                institution.save()
            else:
                Institution.objects.create(**institution_data)

        return instance

class FileUploadSerializer(ModelSerializer):
    class Meta:
        model = UploadedFile
        fields =('id','uploaded_file')

class ArticleSerializer(ModelSerializer):
    auteurs=AuteurSerializer(many=True)
    #pdf_file=FileUploadSerializer()
    class Meta:
        model = Article
        fields = '__all__'
    def create(self, validated_data):
        auteurs_data = validated_data.pop('auteurs',[])

        # Create Auteur instancesIn the previous example, we manually handled the ManyToManyField relationships in the view. This was done to illustrate how you can explicitly manage related objects during updates. If the default behavior of the update method meets your requirements, you can avoid overriding it in your serializer.


        auteurs = []
        for auteur_data in auteurs_data:
            institutions_data = auteur_data.pop('institutions')
            auteur = Auteur.objects.create(**auteur_data)

            # Create Institution instances
            institutions = []
            for institution_data in institutions_data:
                institution = Institution.objects.create(**institution_data)
                institutions.append(institution)

            # Add created institutions to the auteur
            auteur.institutions.set(institutions)
            auteurs.append(auteur)

        # Add created auteurs to the article
        instance = Article.objects.create(**validated_data)
        instance.auteurs.set(auteurs)

        return instance
    def update(self, instance, validated_data):
        auteurs_data = validated_data.pop('auteurs',[])
        # Update Article instance fields
        instance.titre = validated_data.get('titre', instance.titre)
        instance.abstract = validated_data.get('abstract', instance.abstract)
        # Update other fields as needed
        instance.references=validated_data.get('references',instance.references)
        instance.key_words=validated_data.get('key_words',instance.key_words)
        instance.full_text=validated_data.get('full_text',instance.full_text)
        instance.pdf_file=validated_data.get('pdf_file',instance.pdf_file)
        instance.etat=validated_data.get('etat',instance.etat)
        
        instance.save()

        # Update or create Auteur instances
        for auteur_data in auteurs_data:
            institutions_data = auteur_data.pop('institutions',[])
            auteur_id = auteur_data.get("id", None)

            if auteur_id:
                auteur = Auteur.objects.get(id=auteur_id)
                # Update Auteur instance fields
                auteur.nom = auteur_data.get("nom", auteur.nom)
                # Update other fields as needed
                auteur.save()
            else:
                auteur = Auteur.objects.create(**auteur_data)
                instance.auteurs.add(auteur)  # Assuming 'auteurs' is a related name in Article model

            # Update or create Institution instances
            for institution_data in institutions_data:
                institution_id = institution_data.get('id', None)

                if institution_id:
                    institution = Institution.objects.get(id=institution_id)
                    # Update Institution instance fields
                    institution.nom = institution_data.get('nom', institution.nom)
                    # Update other fields as needed
                    institution.save()
                else:
                    institution = Institution.objects.create(**institution_data)
                    auteur.institutions.add(institution)  # Assuming 'institutions' is a related name in Auteur model

        return instance
    