from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mongoURI = "mongodb+srv://amruthsaiporeddy:qwer1234t5@cluster0.4f9gk2w.mongodb.net/?retryWrites=true&w=majority"

app.config["MONGO_URI"]=mongoURI
mongo = MongoClient(app.config['MONGO_URI'])
db = mongo.get_database('Pivony')

# Define a route to handle the incoming data
@app.route('/process_input', methods=['POST'])
def process_input():
    try:
        # Get the input data from the frontend as JSON
        data = request.get_json()

        collection=db.orders
        inserted_data =collection.insert_one(data)
        
        response_data = {
            'message': 'Data received and processed successfully',
            'inserted_id': str(inserted_data .inserted_id)
        }

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_data',methods=['GET'])
def get_data():
    try:
        id=request.args.get('inserted_id')
        target_id=ObjectId(id)
        collection=db.orders
        result=collection.find_one({"_id":target_id})
        if result:
            result.pop("_id")
        else:
            print("Document not found")
        return jsonify(result),200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/save_review',methods=['POST'])
def save_review():
    try:
        data = request.get_json()
        # Extract the values from the JSON data
        input1 = data.get('input1')
        input2 = data.get('input2')
        input3 = data.get('input3')
        items = data.get('items')

        collection=db.reviews
        inserted_data =collection.insert_one(data)
        
        response_data = {
            'message': 'Data received and processed successfully',
            'inserted_id': str(inserted_data .inserted_id)
        }

        return jsonify(response_data), 200

    except Exception as e:
        # Handle any exceptions or errors
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
