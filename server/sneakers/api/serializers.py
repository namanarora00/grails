from rest_framework import serializers
from .models import Sneaker, Vote


class SneakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sneaker
        fields = "__all__"


class VoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = "__all__"
