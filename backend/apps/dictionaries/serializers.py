from rest_framework import serializers

from .models import (
    TypeOfDevice,
    Department,
    Management,
)


class TypeOfDeviceSerializer(serializers.ModelSerializer):
    """
    Type of device serializer.
    """

    class Meta:
        model = TypeOfDevice
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    """
    Department serializer.
    """

    class Meta:
        model = Department
        fields = '__all__'


class ManagementSerializer(serializers.ModelSerializer):
    """
    Management serializer.
    """

    class Meta:
        model = Management
        fields = '__all__'
