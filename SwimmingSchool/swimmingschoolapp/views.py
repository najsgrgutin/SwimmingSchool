from django.shortcuts import render
from swimmingschoolapp.serializers import *
from rest_framework import viewsets, permissions
from .permissions import IsAuthOrCoach
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.generics import *
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
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

    @action(methods=['get'], permission_classes=[IsAuthOrCoach], detail=True)
    def swimmers(self, request, *args, **kwargs):
        group = self.get_object()
        swimmers = Swimmer.objects.filter(group=group)
        serializer = SwimmerSerializer(swimmers, many=True)
        return Response(serializer.data)


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
        print('view', request.data)
        serializer = TrainingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('okej')
        print(serializer.data)
        return Response()
