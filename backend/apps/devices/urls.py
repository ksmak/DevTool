from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import DeviceViewSet


router = DefaultRouter()
router.register('', DeviceViewSet, basename='Devices')

urlpatterns = [
    path('', include(router.urls)),
]
