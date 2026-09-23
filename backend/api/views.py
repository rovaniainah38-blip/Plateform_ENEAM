from rest_framework import viewsets

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
from .serializers import (
    ActualiteSerializer,
    ArchiveSerializer,
    CandidatSerializer,
    ConditionAccesSerializer,
    DossierSerializer,
    EquipeSerializer,
    FormationSerializer,
    InformationSerializer,
    PartenaireSerializer,
    TypeArchiveSerializer,
    TypeDossierSerializer,
    UtilisateurSerializer,
)


class ReadOnlyTableViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = None


class FormationViewSet(ReadOnlyTableViewSet):
    queryset = Formation.objects.all().order_by('id_formation')
    serializer_class = FormationSerializer


class ConditionAccesViewSet(ReadOnlyTableViewSet):
    queryset = ConditionAcces.objects.all().order_by('numero')
    serializer_class = ConditionAccesSerializer


class InformationViewSet(ReadOnlyTableViewSet):
    queryset = Information.objects.all().order_by('id_information')
    serializer_class = InformationSerializer


class TypeArchiveViewSet(ReadOnlyTableViewSet):
    queryset = TypeArchive.objects.all().order_by('id_type')
    serializer_class = TypeArchiveSerializer


class ArchiveViewSet(ReadOnlyTableViewSet):
    queryset = Archive.objects.all().order_by('id_archive')
    serializer_class = ArchiveSerializer


class PartenaireViewSet(ReadOnlyTableViewSet):
    queryset = Partenaire.objects.all().order_by('id_partenaire')
    serializer_class = PartenaireSerializer


class ActualiteViewSet(ReadOnlyTableViewSet):
    queryset = Actualite.objects.all().order_by('-date_publication', '-id_actualite')
    serializer_class = ActualiteSerializer


class EquipeViewSet(ReadOnlyTableViewSet):
    queryset = Equipe.objects.all().order_by('id_equipe')
    serializer_class = EquipeSerializer


class CandidatViewSet(ReadOnlyTableViewSet):
    queryset = Candidat.objects.all().order_by('id_candidat')
    serializer_class = CandidatSerializer


class TypeDossierViewSet(ReadOnlyTableViewSet):
    queryset = TypeDossier.objects.all().order_by('id_type_dossier')
    serializer_class = TypeDossierSerializer


class DossierViewSet(ReadOnlyTableViewSet):
    queryset = Dossier.objects.all().order_by('id_dossier')
    serializer_class = DossierSerializer


class UtilisateurViewSet(ReadOnlyTableViewSet):
    queryset = Utilisateur.objects.all().order_by('id_utilisateur')
    serializer_class = UtilisateurSerializer
