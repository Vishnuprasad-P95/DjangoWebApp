# StudyApp/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
            # Return to the same page with the error message.
            return redirect('login')
    else:
        # If the request method is not POST, display the login page.
        return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            email = form.cleaned_data.get('email')  # Add this line
            User.objects.create_user(username=username, password=password, email=email)  # Modify this line
            messages.success(request, f'Account created for {username}!')
            return redirect('login')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})


@login_required(login_url='login')
def home(request):
    return render(request, 'home.html', {'user': request.user})


def logout_view(request):
    logout(request)
    return redirect('login')



@login_required
@csrf_exempt
def update_user(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        # Get the current user
        user = request.user
        # Update the user's first name and last name
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        # Save the changes
        user.save()
        # Return a success response
        return JsonResponse({'status': 'success'})