from django.db import models
from django.contrib.auth.models import AbstractUser


class Course(models.Model):
    title = models.CharField(max_length=200, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.title}'


class CustomUser(AbstractUser): #
    first_name = None
    last_name = None

    full_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='user_image/', blank=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, related_name='course', null=True)
    password = models.CharField(max_length=255)

    emile_confirmed = models.BooleanField(default=False)
    accepted_to_terms = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'username', 'password']

    def __str__(self):
        if self.course:
            return f'{self.full_name} - {self.course.title}'
        else:
            return f'{self.full_name} - No Course'
