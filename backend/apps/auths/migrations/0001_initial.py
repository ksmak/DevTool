# Generated by Django 4.2.3 on 2023-11-01 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dictionaries', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=150, unique=True, verbose_name='username')),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='name')),
                ('surname', models.CharField(blank=True, max_length=255, null=True, verbose_name='surname')),
                ('patronymic', models.CharField(blank=True, max_length=255, null=True, verbose_name='patronymic')),
                ('is_active', models.BooleanField(default=True, verbose_name='is active')),
                ('is_staff', models.BooleanField(default=False, verbose_name='is staff')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='is superuser')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='avatar')),
                ('date_of_creation', models.DateTimeField(auto_now_add=True, verbose_name='date of creation')),
                ('date_of_change', models.DateTimeField(auto_now=True, verbose_name='date of change')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='dictionaries.department', verbose_name='department')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('management', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='dictionaries.management', verbose_name='management')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'ordering': ('username',),
            },
        ),
    ]
