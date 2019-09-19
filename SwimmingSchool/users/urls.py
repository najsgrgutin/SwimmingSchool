from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework.authtoken import views

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.obtain_auth_token, name='api-token-auth'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
]
