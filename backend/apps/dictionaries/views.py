from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (
    TypeOfDevice,
    Department,
    Management,
    Location,
)
from .serializers import (
    TypeOfDeviceSerializer,
    DepartmentSerializer,
    ManagementSerializer,
    LocationSerializer,
)

dicts = [
    {'name': 'typesOfDevice', 'model': TypeOfDevice,
        'serializer': TypeOfDeviceSerializer},
    {'name': 'departments', 'model': Department,
        'serializer': DepartmentSerializer},
    {'name': 'managements', 'model': Management,
        'serializer': ManagementSerializer},
    {'name': 'locations', 'model': Location,
        'serializer': LocationSerializer},
]


class AllDictionariesView(APIView):
    """
    All dictionaries view.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        arr = []
        for d in dicts:
            objects = d['model'].objects.filter(is_enabled=True)
            dictionary = {
                'name': d['name'],
                'value': d['serializer'](objects, many=True).data
            }
            arr.append(dictionary)

        return Response(arr)
