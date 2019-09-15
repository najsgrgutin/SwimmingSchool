from django.shortcuts import render
from swimmingschool.serializers import *
from rest_framework import viewsets, permissions
from .permissions import IsAuthOrCoach
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.generics import *
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import datetime


class NotificationListView(ListCreateAPIView):
    permission_classes = [IsAuthOrCoach]
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class NotificationDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthOrCoach]
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

    def perform_update(self, serializer):
        serializer.save(created_by=self.request.user)
        serializer.save(created=datetime.datetime.now())


class SwimmingGroupViewSet(viewsets.ModelViewSet):
    queryset = SwimmingGroup.objects.all()
    serializer_class = SwimmingGroupSerializer
    permission_classes = [IsAuthOrCoach]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']


class SwimmerListView(ListCreateAPIView):
    queryset = Swimmer.objects.all()
    serializer_class = SwimmerSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        group_id = self.request.data['group']
        parent_id = self.request.data['parent']
        group = SwimmingGroup.objects.get(id=group_id)
        parent = User.objects.get(id=parent_id)
        serializer.save(group=group, parent=parent)


class SwimmerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Swimmer.objects.all()
    serializer_class = SwimmerSerializer
    permission_classes = [IsAdminUser]

    # mozda apiview pa da poboljsam to
    def perform_update(self, serializer):
        group_id = self.request.data['group']
        # parent_id = self.request.data['parent']
        group = SwimmingGroup.objects.get(id=group_id)
        # parent = User.objects.get(id=parent_id)
        serializer.save(group=group)
        serializer.save(data=self.request.data)


class TrainingView(APIView):
    permission_classes = [IsAuthOrCoach]

    def post(self, request, *args, **kwargs):

        return Response()
