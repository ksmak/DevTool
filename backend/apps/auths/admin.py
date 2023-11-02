from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model


class CustomUserAdmin(UserAdmin):
    """
    Custom user admin
    """

    list_display = (
        'department',
        'management',
        'username',
        'is_active',
        'is_staff',
        'is_superuser',
        'date_of_creation',
        'date_of_change'
    )

    list_filter = (
        'department',
        'management',
        'username',
    )

    fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': (
                'username',
                'password',
            )
        }),
        ('Personal data', {
            'classes': ('wide', ),
            'fields': (
                'name',
                'surname',
                'patronymic',
                'department',
                'management',
                'avatar',
            )
        }),
        ('Permissions', {
            'classes': ('wide', ),
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
            )
        })
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': (
                'username',
                'password1',
                'password2',
            )
        }),
        ('Personal data', {
            'classes': ('wide', ),
            'fields': (
                'name',
                'surname',
                'patronymic',
                'department',
                'management',
                'avatar',
            )
        }),
        ('Permissions', {
            'classes': ('wide', ),
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
            )
        })
    )

    search_fields = ('username', )

    ordering = ('department', 'management', 'username')

    readonly_fields = (
        'is_superuser',
    )


admin.site.register(get_user_model(), CustomUserAdmin)
