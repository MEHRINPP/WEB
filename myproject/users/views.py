from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth import authenticate

# Sign up view
class SignupView(APIView):
    def post(self, request):
        print("Received data:", request.data)  # Log the request data

        # Initialize the serializer with request data
        serializer = UserSerializer(data=request.data)
        
        # Check if the data is valid
        if serializer.is_valid():
            # If valid, save the user and return a success response
            serializer.save()
            return Response(
                {"message": "User created successfully. Redirecting to login..."},
                status=status.HTTP_201_CREATED
            )
        else:
            # Log the error if the data is not valid
            print("Errors:", serializer.errors)  # Print the validation errors to console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Login view
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

class LoginView(APIView):
    def post(self, request):
        # Retrieve username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user using Django's built-in authenticate method
        user = authenticate(username=username, password=password)

        if user:
            # If authentication is successful, generate JWT tokens
            refresh = RefreshToken.for_user(user)
            # Return the user data along with the JWT tokens
            return Response({
                'user': {
                    'username': user.username,  # Return the username
                    'email': user.email,        # You can return other user info if needed
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        else:
            # If authentication fails, return invalid credentials
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
