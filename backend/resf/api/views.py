from django.shortcuts import render
from rest_framework import viewsets
from .models import Event, Session
from .serializers import EventSerializer,SessionSerializer

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer