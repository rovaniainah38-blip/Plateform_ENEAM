from rest_framework import serializers

from .models import (
    Actualite,
    Archive,
    Candidat,
    ConditionAcces,
    Dossier,
    Equipe,
    Formation,
    Information,
    Partenaire,
    TypeArchive,
    TypeDossier,
    Utilisateur,
)


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = '__all__'


class ConditionAccesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConditionAcces
        fields = '__all__'


class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = '__all__'


class TypeArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeArchive
        fields = '__all__'


class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = '__all__'


class PartenaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partenaire
        fields = '__all__'


class ActualiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actualite
        fields = '__all__'


class EquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe
        fields = '__all__'


class CandidatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidat
        fields = '__all__'


class TypeDossierSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeDossier
        fields = '__all__'


class DossierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dossier
        fields = '__all__'


class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        exclude = ('mot_de_passe',)
