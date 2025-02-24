from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import render

from .models import Profile, Project, Certificate, CertifyingInstitution
from .serializers import (
    ProjectSerializer,
    ProfileSerializer,
    CertifyingInstitutionSerializer,
    CertificateSerializer
)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        if request.method == 'GET':
            profile = self.get_object()
            projects = profile.projects.all()
            certificates = profile.certificates.all()
            return render(
                request,
                'profile_detail.html',
                {
                    'profile': profile,
                    'projects': projects,
                    'certificates': certificates
                }
            )
        return super().retrieve(request, *args, **kwargs)

    def get_permissions(self):
        if self.action == 'retrieve':
            return [AllowAny()]
        return [IsAuthenticated()]


class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class CertifyingInstitutionViewSet(viewsets.ModelViewSet):
    queryset = CertifyingInstitution.objects.all()
    serializer_class = CertifyingInstitutionSerializer
