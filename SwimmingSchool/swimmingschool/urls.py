from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(r'groups', SwimmingGroupViewSet)

urlpatterns = [
    path('notifications/', NotificationListView.as_view()),
    path('notifications/<int:pk>', NotificationDetailView.as_view()),
    path('', include(router.urls)),
    path('swimmers/', SwimmerListView.as_view()),
    path('swimmers/<int:pk>', SwimmerDetailView.as_view()),
    path('trainings/', TrainingView.as_view())
]