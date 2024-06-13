import json
import re
from app import app, db, TradeRecord

def clean_numeric_value(value):
    # Define a regex pattern to match digits, dots, and commas
    pattern = r'[\d.,]+'
    match = re.match(pattern, value)

    if match:
        cleaned_value = match.group(0).replace(',', '.')
        try:
            return float(cleaned_value)
        except ValueError:
            return None
    else:
        return None

def migrate_data_from_json(json_file):
    with app.app_context():
        with open(json_file, 'r') as file:
            json_data = json.load(file)

            for item in json_data:
                cleaned_high = clean_numeric_value(item['high'])
                cleaned_low = clean_numeric_value(item['low'])
                cleaned_open = clean_numeric_value(item['open'])
                cleaned_close = clean_numeric_value(item['close'])

                if any(value is None for value in [cleaned_high, cleaned_low, cleaned_open, cleaned_close]):
                    print(f"Skipped record due to invalid numeric format: {item}")
                    continue
                
                existing_record = TradeRecord.query.filter_by(date=item['date'], trade_code=item['trade_code']).first()

                if existing_record:
                    # Update existing record
                    existing_record.high = cleaned_high
                    existing_record.low = cleaned_low
                    existing_record.open = cleaned_open
                    existing_record.close = cleaned_close
                    existing_record.volume = item['volume']
                else:
                    # Here insert new record
                    new_record = TradeRecord(
                        date=item['date'],
                        trade_code=item['trade_code'],
                        high=cleaned_high,
                        low=cleaned_low,
                        open=cleaned_open,
                        close=cleaned_close,
                        volume=item['volume']
                    )
                    db.session.add(new_record)

            db.session.commit()
            print(f'Imported {len(json_data)} records from {json_file}.')

if __name__ == '__main__':
    json_file = 'data.json'  
    migrate_data_from_json(json_file)
