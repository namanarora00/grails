import requests
import json

BASE_URL = 'http://api.thesneakerdatabase.com/v1/'
TARGET = 'data.json'


def _send_request(url, limit, page, gender, brand):
    api_url = BASE_URL + url + \
        f'?limit={limit}&page={page}&gender={gender}&brand={brand}'
    res = requests.get(api_url)
    return res.json()


def get_sneakers(limit, page, brand):
    res = _send_request('sneakers', limit, page, 'men', brand)
    res = res['results']
    res = filter(lambda data: data['media']['imageUrl'] is not None, res)

    return list(res)


def populate():
    sneaker_data = []
    print("Getting data..")

    for page in range(1, 30):
        data = get_sneakers(100, page, 'Jordan')
        sneaker_data.extend(data)

        print(f'Got {len(data)} sneakers in page {page}')

    with open(TARGET, 'w') as f:
        json.dump(sneaker_data, f)

    print("Done populating data")


if __name__ == "__main__":
    populate()
