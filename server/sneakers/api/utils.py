import json
from .models import Sneaker

DATA_FILE = 'data/data.json'


def populate_db():
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

        for sneaker in data:
            d = {}

            d['name'] = sneaker['title']
            d['rating'] = sneaker['retailPrice'] or 120
            d['retail_price'] = sneaker['retailPrice'] or 120
            d['shoe'] = sneaker['shoe']
            d['image_url'] = sneaker['media']['imageUrl']

            s = Sneaker(**d)
            s.save()
