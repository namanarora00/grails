import random

from django.shortcuts import get_object_or_404
from django.db.models import Exists, OuterRef
from django.db import transaction

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Sneaker, Vote
from .serializers import SneakerSerializer, VoteSerializer
from .rating import new_rating


class SneakerDetail(APIView):
    def get(self, request, pk):
        sneaker = get_object_or_404(Sneaker, pk=pk)
        serializer = SneakerSerializer(sneaker)
        return Response(serializer.data)


class SneakerList(APIView):
    def get(self, request):
        serializer = SneakerSerializer(
            Sneaker.objects.all().order_by("-rating")[:10], many=True)
        return Response(serializer.data)


class VoteDetail(APIView):
    def post(self, request):
        with transaction.atomic():
            serializer = VoteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                winner = get_object_or_404(Sneaker, pk=request.data['winner'])
                loser = get_object_or_404(Sneaker, pk=request.data['loser'])

                old_winner_rating = winner.rating
                old_loser_rating = loser.rating

                new_rating_winner, new_rating_loser = new_rating(
                    old_winner_rating, old_loser_rating)

                winner.rating = new_rating_winner
                loser.rating = new_rating_loser

                winner.save()
                loser.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SneakerRecommendation(APIView):
    def get(self, request):
        other_sneaker = get_object_or_404(
            Sneaker, pk=self.request.query_params.get('sneaker'))
        uid = self.request.query_params.get('uid')

        if other_sneaker is None or uid is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        reco = Sneaker.objects.filter(
            ~Exists(Vote.objects.filter(
                winner=OuterRef('pk'), loser=other_sneaker, uid=uid)),

            ~Exists(Vote.objects.filter(
                winner=other_sneaker, loser=OuterRef('pk'), uid=uid))
        )

        if random.randint(1, 10) > 7:
            reco = reco.order_by('rating')[0]
        else:
            reco = reco.order_by('-rating')[0]

        serializer = SneakerSerializer(reco)
        return Response(serializer.data)
