from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Intra42User

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Intra42User

class Intra42UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is write-only
    username = serializers.CharField(source='login')

    class Meta:
        model = Intra42User
        fields = ['username', 'email', 'password']  # You can add more fields like image if needed

    def validate_email(self, value):
        """
        Ensure the email is unique.
        """
        if Intra42User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value

    def validate_login(self, value):
        """
        Ensure the login is unique.
        """
        if Intra42User.objects.filter(login=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value

    def create(self, validated_data):
        """
        Create a new user with the validated data.
        """
        password = validated_data.pop('password')  # Remove password from validated data
        user = Intra42User(**validated_data)  # Create the user instance
        user.password = make_password(password)  # Hash the password before saving
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)  # Username field
    password = serializers.CharField(write_only=True)  # Password field, write-only
