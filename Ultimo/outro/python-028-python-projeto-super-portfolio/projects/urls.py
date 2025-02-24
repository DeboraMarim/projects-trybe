from django.urls import include, path
from rest_framework import routers
from .views import (
    ProfileViewSet,
    ProjectsViewSet,
    CertificateViewSet,
    CertifyingInstitutionViewSet
)

router = routers.DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profiles')
router.register(r'projects', ProjectsViewSet, basename='projects')
router.register(r'certificates', CertificateViewSet, basename='certificates')
router.register(r'certifying-institutions', CertifyingInstitutionViewSet, basename='certifying-institutions')

urlpatterns = [
    path('', include(router.urls)),
]

