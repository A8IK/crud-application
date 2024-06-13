from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PrimaryKeyConstraint

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trade_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class TradeRecord(db.Model):
    __tablename__ = 'trade_record'
    date = db.Column(db.String, primary_key=True)
    trade_code = db.Column(db.String(10), primary_key=True)
    high = db.Column(db.Float, nullable=False)
    low = db.Column(db.Float, nullable=False)
    open = db.Column(db.Float, nullable=False)
    close = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'date': self.date,
            'trade_code': self.trade_code,
            'high': self.high,
            'low': self.low,
            'open': self.open,
            'close': self.close,
            'volume': self.volume
        }
        
TradeRecord.__table_args__ = (
    db.PrimaryKeyConstraint('date', 'trade_code', name='pk_trade_record'),
)

# Created all database tables
def create_tables():
    with app.app_context():
        db.create_all()

@app.route('/')
def index():
    return 'Welcome to my Flask application'

@app.route('/data', methods=['GET'])
def get_data():
    records = TradeRecord.query.all()
    return jsonify([record.to_dict() for record in records])

@app.route('/data', methods=['POST'])
def add_data():
    data = request.json
    new_record = TradeRecord(**data)
    db.session.add(new_record)
    db.session.commit()
    return jsonify(new_record.to_dict()), 201

@app.route('/data', methods=['PUT'])
def update_data():
    data = request.json
    date = data.pop('date', None)
    trade_code = data.pop('trade_code', None)
    if date and trade_code:
        record = TradeRecord.query.filter_by(date=date, trade_code=trade_code).first()
        if record:
            for key, value in data.items():
                setattr(record, key, value)
            db.session.commit()
            return jsonify(record.to_dict()), 200
        return jsonify({"error": "Record not found"}), 404
    return jsonify({"error": "Date and trade_code are required"}), 400

@app.route('/data', methods=['DELETE'])
def delete_data():
    data = request.json
    date = data.get('date')
    trade_code = data.get('trade_code')
    if date and trade_code:
        record = TradeRecord.query.filter_by(date=date, trade_code=trade_code).first()
        if record:
            db.session.delete(record)
            db.session.commit()
            return '', 204
        return jsonify({"error": "Record not found"}), 404
    return jsonify({"error": "Date and trade_code are required"}), 400

# Function which create the Flask app with initialized tables
def create_app():
    create_tables()
    return app

if __name__ == '__main__':
    create_app().run(debug=True)
