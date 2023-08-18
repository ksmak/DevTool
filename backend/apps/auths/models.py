from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin
)
from django.core.exceptions import ValidationError

from dictionaries.models import (
    Department,
    Management
)


class CustomUserManager(BaseUserManager):
    """
    Custom user manager.
    """

    def create_user(
        self,
        username: str,
        password: str
    ) -> 'CustomUser':
        if not username:
            raise ValidationError('Username required.')

        user: 'CustomUser' = self.model(
            username=username
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        username: str,
        password: str
    ) -> 'CustomUser':
        user: 'CustomUser' = self.create_user(
            username=username,
            password=password
        )

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model.
    """
    username = models.CharField(
        verbose_name=_('username'),
        max_length=150,
        unique=True
    )

    name = models.CharField(
        verbose_name=_('name'),
        max_length=255,
        blank=True,
        null=True
    )

    surname = models.CharField(
        verbose_name=_('surname'),
        max_length=255,
        blank=True,
        null=True
    )

    patronymic = models.CharField(
        verbose_name=_('patronymic'),
        max_length=255,
        blank=True,
        null=True
    )

    is_active = models.BooleanField(
        verbose_name=_('is active'),
        default=True
    )

    is_staff = models.BooleanField(
        verbose_name=_('is staff'),
        default=False
    )

    is_superuser = models.BooleanField(
        verbose_name=_('is superuser'),
        default=False
    )

    department = models.ForeignKey(
        verbose_name=_('department'),
        to=Department,
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True
    )

    management = models.ForeignKey(
        verbose_name=_('management'),
        to=Management,
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True
    )

    avatar = models.ImageField(
        verbose_name=_('avatar'),
        upload_to='images/',
        blank=True,
        null=True
    )

    date_of_creation = models.DateTimeField(
        verbose_name=_('date of creation'),
        auto_now_add=True
    )

    date_of_change = models.DateTimeField(
        verbose_name=_('date of change'),
        auto_now=True
    )

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.username

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ('username',)
