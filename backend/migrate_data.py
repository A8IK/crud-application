import json
from app import db, Data

with open('data.json', 'r') as file:
    json_data = json.load(file)

for item in json_data:
    new_row = Data(
        date=item['date'],
        trade_code=item['trade_code'],
        high=item['high'],
        low=item['low'],
        open=item['open'],
        close=item['close'],
        volume=item['volume']
    )
    db.session.add(new_row)

db.session.commit()
