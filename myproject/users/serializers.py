from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # Explicitly setting write_only to True for the password field
    password = serializers.CharField(write_only=True)  # This ensures the password is write-only
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Include the fields you need
    
    def create(self, validated_data):
        # Extract the password field from validated data
        password = validated_data.pop('password')  # Remove the password from validated data
        
        # Create the user using create_user, which hashes the password
        user = User.objects.create_user(**validated_data)
        
        # Set the password using set_password (it will hash the password properly)
        user.set_password(password)
        user.save()
        
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
