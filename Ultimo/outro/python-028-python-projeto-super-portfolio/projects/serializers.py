from rest_framework import serializers
from projects.models import (
    Profile,
    Project,
    CertifyingInstitution,
    Certificate,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'


class NestedCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'name']


class CertifyingInstitutionSerializer(serializers.ModelSerializer):
    certificates = NestedCertificateSerializer(many=True)

    class Meta:
        model = CertifyingInstitution
        fields = ["url", "certificates", "name", "id"]

    def create(self, validated_data):
        certificate_data = validated_data.pop("certificates")

        for certificates in certificate_data:
            certificates[
                "certifying_institution"
            ] = CertifyingInstitution.objects.create(**validated_data)
            CertificateSerializer().create(validated_data=certificates)
        return certificates["certifying_institution"]