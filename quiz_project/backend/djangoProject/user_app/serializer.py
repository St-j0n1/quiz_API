from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model, authenticate
from django.core.validators import ValidationError


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['full_name', 'username', 'email', 'course', 'password', 'accepted_to_terms']

    def create(self, clean_data):
        user = CustomUser.objects.create_user(
            full_name=clean_data['full_name'],
            email=clean_data['email'],
            course=clean_data['course'],
            accepted_to_terms=clean_data['accepted_to_terms'],
            username=clean_data['username']
        )
        user.set_password(clean_data['password'])

        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['full_name', 'username', 'email', 'image', 'course']
