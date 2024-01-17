from urllib import request

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CustomUser
from .permissions import IsNotAuthenticated
from .serializer import UserRegisterSerializer, UserLoginSerializer, UserSerializer, UserPasswordResetSerializer
from rest_framework import permissions, status
from .validations import validate_password, custom_validation
from rest_framework import generics


class UserRegister(generics.CreateAPIView):
    permission_classes = [IsNotAuthenticated]
    serializer_class = UserRegisterSerializer
    queryset = CustomUser.objects.all()


class UserLogin(APIView):
    """
    valid date for log in
    {
    "email": "joni.sturua1@gmail.com",
    "password": "password"
    }
    """


    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        # assert validate_email(data)
        # assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserPasswordResetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = UserPasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            user.save()
            return Response({'detail': 'Password reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)