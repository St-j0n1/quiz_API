from rest_framework import serializers
from .models import CustomUser, Course
from django.contrib.auth import get_user_model, authenticate
from django.core.validators import ValidationError


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", 'title', 'is_active']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['full_name', 'username', 'email', 'course', 'password', 'accepted_to_terms']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
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
        fields = '__all__'


class UserPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})
    new_password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(username=email, password=password)

        if not user:
            raise ValidationError('Invalid credentials')

        # You may also want to check if the new password is different from the old password
        if password == attrs.get('new_password'):
            raise ValidationError('New password must be different from the old password')

        user.set_password(attrs.get('new_password'))
        attrs['user'] = user  # Store the user in the validated data
        return attrs