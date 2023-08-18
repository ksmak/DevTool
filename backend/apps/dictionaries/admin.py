from django.contrib import admin

from .models import (
    TypeOfDevice,
    Department,
    Management,
)

admin.site.register(TypeOfDevice)
admin.site.register(Department)
admin.site.register(Management)
