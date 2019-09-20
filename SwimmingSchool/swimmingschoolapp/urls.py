from django.urls import path
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'groups', SwimmingGroupViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'swimmers', SwimmerViewSet)

urlpatterns = [
    path('trainings/', TrainingView.as_view(), name='list_create_training')
]

urlpatterns += router.urls
