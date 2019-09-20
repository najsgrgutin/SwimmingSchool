from django.shortcuts import render
from swimmingschoolapp.serializers import *
from rest_framework import viewsets, permissions
from .permissions import IsAuthOrCoach
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.generics import *
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import datetime

# roditelj nakon uspješne registracije i logina prvo bira svoje dijete
# te se salje request da se dijetetu doda roditelj


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    permission_classes = [IsAuthOrCoach]
    serializer_class = NotificationSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(created_by=self.request.user)
        serializer.save(created=datetime.datetime.now())


class SwimmingGroupViewSet(viewsets.ModelViewSet):
    queryset = SwimmingGroup.objects.all()
    serializer_class = SwimmingGroupSerializer
    permission_classes = [IsAuthOrCoach]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']


class SwimmerViewSet(viewsets.ModelViewSet):
    queryset = Swimmer.objects.all()
    serializer_class = SwimmerSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def perform_create(self, serializer):
        group_id = self.request.data['group']
        group = SwimmingGroup.objects.get(id=int(group_id))
        serializer.save(group=group)

    def perform_update(self, serializer):
        group_id = self.request.data['group']
        group = SwimmingGroup.objects.get(id=group_id)
        serializer.save(group=group)


class TrainingView(APIView):
    permission_classes = [IsAuthOrCoach]

    def get(self, request, *args, **kwargs):
        print(request)
        return Response()

    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response()
