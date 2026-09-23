from rest_framework.routers import DefaultRouter

from .views import (
    ActualiteViewSet,
    ArchiveViewSet,
    CandidatViewSet,
    ConditionAccesViewSet,
    DossierViewSet,
    EquipeViewSet,
    FormationViewSet,
    InformationViewSet,
    PartenaireViewSet,
    TypeArchiveViewSet,
    TypeDossierViewSet,
    UtilisateurViewSet,
)

router = DefaultRouter()
router.register('formations', FormationViewSet, basename='formation')
router.register('conditions-acces', ConditionAccesViewSet, basename='condition-acces')
router.register('informations', InformationViewSet, basename='information')
router.register('types-archives', TypeArchiveViewSet, basename='type-archive')
router.register('archives', ArchiveViewSet, basename='archive')
router.register('partenaires', PartenaireViewSet, basename='partenaire')
router.register('actualites', ActualiteViewSet, basename='actualite')
router.register('equipe', EquipeViewSet, basename='equipe')
router.register('candidats', CandidatViewSet, basename='candidat')
router.register('types-dossiers', TypeDossierViewSet, basename='type-dossier')
router.register('dossiers', DossierViewSet, basename='dossier')
router.register('utilisateurs', UtilisateurViewSet, basename='utilisateur')

urlpatterns = router.urls
