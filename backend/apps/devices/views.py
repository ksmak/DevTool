from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Device
from .serializers import DeviceSerializer
from .paginators import StandardResultsSetPagination
from .services import create_excel


class DeviceViewSet(ModelViewSet):
    """
    Device viewset.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = (IsAuthenticated, )
    pagination_class = StandardResultsSetPagination

    @action(detail=False, methods=['GET'])
    def export_excel(self, request, pk=None):

        ids = request.GET.getlist('ids')

        file_url = create_excel(ids)

        return Response({
            'url': file_url
        })
