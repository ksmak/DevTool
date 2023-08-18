from django.db import models
from django.utils.translation import gettext_lazy as _

from dictionaries.models import (
    TypeOfDevice,
    Department,
    Management,
)


class Device(models.Model):
    """
    Device model.
    """

    ip = models.GenericIPAddressField(
        verbose_name=_('id address'),
        unique=True
    )

    type_of_device = models.ForeignKey(
        verbose_name=_('type of device'),
        to=TypeOfDevice,
        on_delete=models.RESTRICT
    )

    location = models.CharField(
        verbose_name=_('location'),
        max_length=300,
        blank=True,
        null=True
    )

    cabinet = models.CharField(
        verbose_name=_('cabinet'),
        max_length=5,
        blank=True,
        null=True
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

    employee = models.CharField(
        verbose_name=_('employee'),
        max_length=255,
        blank=True,
        null=True
    )

    remote_admin_url = models.URLField(
        verbose_name=_('remote admin url'),
        blank=True,
        null=True
    )

    def __str__(self):
        return self.ip

    class Meta:
        verbose_name = _('device')
        verbose_name_plural = _('devices')
        ordering = ('ip', )
