from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet,SessionViewSet

router = DefaultRouter()
router.register(r'events',PostViewSet)
router.register(r'sessions',SessionViewSet)

urlpatterns = [
    path('',include(router.urls))
]
