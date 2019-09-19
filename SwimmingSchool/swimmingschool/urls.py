from django.urls import path
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'groups', SwimmingGroupViewSet)

urlpatterns = [
    path('notifications/', NotificationListView.as_view()),
    path('notifications/<int:pk>', NotificationDetailView.as_view()),
    path('swimmers/', SwimmerListView.as_view()),
    path('swimmers/<int:pk>', SwimmerDetailView.as_view()),
]

urlpatterns += router.urls
