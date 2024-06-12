from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

@app.route('/')
def index():
    return 'Welcome to the Flask API'

@app.route('/data', methods=['GET'])
def get_json_data():
    with open(DATA_FILE) as json_file:
        data = json.load(json_file)
    return jsonify(data)

@app.route('/data', methods=['POST'])
def add_data():
    new_entry = request.json
    with open(DATA_FILE, 'r+') as json_file:
        data = json.load(json_file)
        data.append(new_entry)
        json_file.seek(0)
        json.dump(data, json_file, indent=4)
    return jsonify(new_entry), 201

@app.route('/data', methods=['PUT'])
def update_data():
    updated_entry = request.json
    with open(DATA_FILE, 'r+') as json_file:
        data = json.load(json_file)
        for entry in data:
            if entry['date'] == updated_entry['date'] and entry['trade_code'] == updated_entry['trade_code']:
                entry.update(updated_entry)
                break
        json_file.seek(0)
        json.dump(data, json_file, indent=4)
    return jsonify(updated_entry), 200

@app.route('/data', methods=['DELETE'])
def delete_data():
    delete_entry = request.json
    with open(DATA_FILE, 'r+') as json_file:
        data = json.load(json_file)
        data = [entry for entry in data if not (entry['date'] == delete_entry['date'] and entry['trade_code'] == delete_entry['trade_code'])]
        json_file.seek(0)
        json_file.truncate()
        json.dump(data, json_file, indent=4)
    return '', 204

if __name__ == '__main__':
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as json_file:
            json.dump([], json_file)
    app.run(debug=True)

