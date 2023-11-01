from django.db import models
from django.utils.translation import gettext_lazy as _


class TypeOfDevice(models.Model):
    """
    Type of device model.
    """
    is_enabled = models.BooleanField(
        verbose_name=_('is enabled'),
        default=True
    )

    title = models.CharField(
        verbose_name=_('title'),
        max_length=200
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = _('type of defice'),
        verbose_name_plural = _('types of defice')
        ordering = (
            'title',
        )


class Department(models.Model):
    """
    Department model.
    """
    is_enabled = models.BooleanField(
        verbose_name=_('is enabled'),
        default=True
    )

    title = models.CharField(
        verbose_name=_('title'),
        max_length=200
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = _('department'),
        verbose_name_plural = _('departments')
        ordering = (
            'title',
        )


class Management(models.Model):
    """
    Management model.
    """
    is_enabled = models.BooleanField(
        verbose_name=_('is enabled'),
        default=True
    )

    title = models.CharField(
        verbose_name=_('title'),
        max_length=200
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = _('management'),
        verbose_name_plural = _('managements')
        ordering = (
            'title',
        )

class Location(models.Model):
    """
    Location model.
    """
    is_enabled = models.BooleanField(
        verbose_name=_('is enabled'),
        default=True
    )

    title = models.CharField(
        verbose_name=_('title'),
        max_length=200
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = _('location'),
        verbose_name_plural = _('locations')
        ordering = (
            'title',
        )
