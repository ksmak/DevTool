# Generated by Django 4.2.3 on 2023-08-14 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_enabled', models.BooleanField(default=True, verbose_name='is enabled')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
            ],
            options={
                'verbose_name': ('department',),
                'verbose_name_plural': 'departments',
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='Management',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_enabled', models.BooleanField(default=True, verbose_name='is enabled')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
            ],
            options={
                'verbose_name': ('management',),
                'verbose_name_plural': 'managements',
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='TypeOfDevice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_enabled', models.BooleanField(default=True, verbose_name='is enabled')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
            ],
            options={
                'verbose_name': ('type of defice',),
                'verbose_name_plural': 'types of defice',
                'ordering': ('title',),
            },
        ),
    ]
