from django.db import models


class Formation(models.Model):
    id_formation = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)
    type = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)

    class Meta:
        db_table = 'formations'


class ConditionAcces(models.Model):
    numero = models.AutoField(primary_key=True)
    id_formation = models.ForeignKey(Formation, db_column='id_formation', on_delete=models.DO_NOTHING, related_name='conditions')
    condition = models.TextField(null=True)

    class Meta:
        db_table = 'conditions_acces'


class Information(models.Model):
    id_information = models.AutoField(primary_key=True)
    logo = models.CharField(max_length=255, null=True)
    numero_telephone = models.CharField(max_length=255, null=True)
    adresse_email = models.CharField(max_length=255, null=True)
    historique = models.TextField(null=True)
    lieu_code_map = models.CharField(max_length=255, null=True)
    agrement = models.CharField(max_length=255, null=True)
    comment_nous_rejoindre = models.TextField(null=True)
    adresse_local = models.CharField(max_length=255, null=True)
    contacts = models.TextField(null=True)

    class Meta:
        db_table = 'informations'


class TypeArchive(models.Model):
    id_type = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'types_archive'


class Archive(models.Model):
    id_archive = models.AutoField(primary_key=True)
    id_type = models.ForeignKey(TypeArchive, db_column='id_type', on_delete=models.DO_NOTHING, related_name='archives')
    nom = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'archives'


class Partenaire(models.Model):
    id_partenaire = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)
    logo = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'partenaires'


class Actualite(models.Model):
    id_actualite = models.AutoField(primary_key=True)
    titre = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    date_publication = models.DateField(null=True)
    image = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'actualites'


class Equipe(models.Model):
    id_equipe = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)
    prenom = models.CharField(max_length=255, null=True)
    fonction = models.CharField(max_length=255, null=True)
    titre = models.CharField(max_length=255, null=True)
    image = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'equipe'


class Candidat(models.Model):
    id_candidat = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)
    prenom = models.CharField(max_length=255, null=True)
    photo = models.CharField(max_length=255, null=True)
    date_naissance = models.DateField(null=True)
    lieu_naissance = models.CharField(max_length=255, null=True)
    contact = models.CharField(max_length=255, null=True)
    adresse_email = models.CharField(max_length=255, null=True)
    droit_concours = models.BooleanField(null=True)
    est_eleve = models.BooleanField(null=True)

    class Meta:
        db_table = 'candidats'


class TypeDossier(models.Model):
    id_type_dossier = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'types_dossier'


class Dossier(models.Model):
    id_dossier = models.AutoField(primary_key=True)
    id_type_dossier = models.ForeignKey(TypeDossier, db_column='id_type_dossier', on_delete=models.DO_NOTHING, related_name='dossiers')
    id_candidat = models.ForeignKey(Candidat, db_column='id_candidat', on_delete=models.DO_NOTHING, related_name='dossiers')
    image = models.CharField(max_length=255, null=True)
    fin_validite = models.DateField(null=True)
    descriptions = models.TextField(null=True)

    class Meta:
        db_table = 'dossiers'


class Utilisateur(models.Model):
    id_utilisateur = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, null=True)
    prenom = models.CharField(max_length=255, null=True)
    adresse_email = models.CharField(max_length=255, null=True)
    mot_de_passe = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'utilisateurs'
