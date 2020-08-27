from django.urls import path

from .views import SneakerDetail, SneakerRecommendation, SneakerList, VoteDetail

urlpatterns = [
    path('sneakers/', SneakerList.as_view()),
    path('sneakers/<int:pk>/', SneakerDetail.as_view()),
    path('recommend/', SneakerRecommendation.as_view()),
    path('vote/', VoteDetail.as_view())
]
