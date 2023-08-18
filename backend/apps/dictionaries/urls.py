from django.urls import path

from .views import AllDictionariesView

urlpatterns = [
    path('', AllDictionariesView.as_view()),
]
