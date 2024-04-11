# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from Modules.grants import Grants
from Modules.fundings import Fundings
from Modules.profile import Profile
from Modules.publications import Publications
from Modules.recommendation import Recommendation
from Modules.ratingMechanism import RatingMechanism
from utils.helper import decodedHeaderHelper
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/grants/<id>', methods=['GET'])
def grants(id):
    token = request.headers.get('Authorization')
    if(decodedHeaderHelper(token)):
        return decodedHeaderHelper(token)
    result = Grants()
    out = result.parse(id)
    return out


@app.route('/fundings/<id>/<type>', methods=['POST'])
def fundings(id, type):
    token = request.headers.get('Authorization')
    if(decodedHeaderHelper(token)):
        return decodedHeaderHelper(token)
    payload = request.get_json()
    result = Fundings()
    out = result.get_fundings(id, type, payload)
    return (out)


@app.route('/notifications/<id>', methods=['POST'])
def notifications(id):
    token = request.headers.get('Authorization')
    if(decodedHeaderHelper(token)):
        return decodedHeaderHelper(token)
    payload = request.get_json()
    result = Fundings()
    out = result.enable_notifiactions(id, payload)
    return out

# No need to secure this route.
# need to verify from the frontend. special scenario


@app.route('/profile/<name>/<url>', methods=['GET'])
def profile(name, url):
    profile = Profile()
    data = profile.profile(
        query=name,
        url=url,
        pagination=True,
        save_to_csv=False,
        save_to_json=False,
        save_to_keyword=True
    )
    if len(data):
        return data
    else:
        return {"title": 'Oops! We could not create the profile. Please provide differrent names instead. Thank You.', "message": "(Note: This platform is only for staff researchers.)"}


@app.route('/publications/<id>', methods=['GET'])
def publications(id):
    token = request.headers.get('Authorization')
    if(decodedHeaderHelper(token)):
        return decodedHeaderHelper(token)
    publishes = Publications()
    data = publishes.publication_data(
        user_id=id,
        parse_articles=True,
        article_pagination=True
    )
    return data


@app.route('/recommendation/<id>/<type>', methods=['POST'])
def recommendation(id, type):
    token = request.headers.get('Authorization')
    if(decodedHeaderHelper(token)):
        return decodedHeaderHelper(token)
    payload = request.get_json()
    recommendation = Recommendation()
    data = recommendation.result(id, type, payload)
    return data


@app.route('/rate', methods=['POST'])
def ratingMecahnism():
    token = request.headers.get('Authorization')
    if(decodedHeaderHelper(token)):
        return decodedHeaderHelper(token)
    payload = request.get_json()
    ratingMecahnism = RatingMechanism()
    data = ratingMecahnism.rate(  # Retrieve data for each researcher Sample Data
        researchers_data=[payload['researcherData']])
    return data

# A welcome message to test our server


@app.route('/')
def index():
    return "<center><h1>Welcome to our server 🥳👌 !!</h1></center>"


if __name__ == '_main_':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(port=5000)