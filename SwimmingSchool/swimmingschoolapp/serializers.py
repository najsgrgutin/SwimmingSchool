from swimmingschoolapp.models import *
from rest_framework import serializers
from users.serializers import UserSerializer


class NotificationSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            'id',
            'title',
            'description',
            'created',
            'created_by'
        ]


class SwimmingGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = SwimmingGroup
        fields = '__all__'


class SwimmerSerializer(serializers.ModelSerializer):
    group = SwimmingGroupSerializer(many=False, read_only=True)
    parent = UserSerializer(many=False, read_only=True, required=False)

    class Meta:
        model = Swimmer
        fields = [
            'first_name',
            'last_name',
            'born',
            'parent',
            'group',
        ]


class TrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Training
        fields = '__all__'


class TrainingSwimmerSerializer(serializers.ModelSerializer):
    training = TrainingSerializer(many=False, read_only=True)
    swimmer = SwimmerSerializer(many=False, read_only=True)
    group = SwimmingGroupSerializer(many=False, read_only=True)

    class Meta:
        model = TrainingSwimmer
        fields = [
            'swimmer',
            'training',
            'group',
            'presence'
        ]
