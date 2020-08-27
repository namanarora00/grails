from django.db import models


class Sneaker(models.Model):
    name = models.CharField(max_length=200)
    rating = models.FloatField()
    image_url = models.URLField()
    retail_price = models.IntegerField()
    shoe = models.CharField(max_length=200)


class Vote(models.Model):
    winner = models.ForeignKey(
        Sneaker, related_name='win_votes', on_delete=models.CASCADE)
    loser = models.ForeignKey(
        Sneaker, related_name='lost_votes', on_delete=models.CASCADE)
    date_time = models.DateTimeField(auto_now=True)
    uid = models.CharField(max_length=100)

    class Meta:
        unique_together = ("winner", "loser", "uid")
