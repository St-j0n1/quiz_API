from django.contrib import admin
from user_app.models import CustomUser, Course

admin.site.register(CustomUser)
admin.site.register(Course)
