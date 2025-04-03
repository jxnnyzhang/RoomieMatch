# Main Flask App placeholders 
import sqlite3
import flask
from flask import Flask, request, jsonify

DATABASE_PATH = 'roomie_match.db'

app = Flask(__name__)

def get_db():
    db = getattr(flask, '_database', None)
    if db is None:
        db = flask._database = sqlite3.connect(DATABASE_PATH)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(flask, '_database', None)
    if db is not None:
        db.close()
        flask._database = None

@app.route('/')
def home():
    return "RoomieMatch API is running"

@app.route('/create_user', methods=['POST'])
def create_user():
    user_data = request.json

    conn = get_db()
    cursor = conn.cursor()

    user_data['userID'] = 10 # TODO fix
    try:
        cursor.execute("""INSERT INTO roommate_profiles VALUES (
            :userID,
            :firstname, :lastname, :case_email, :gender, :gender_preference, :housing, :year, :major, :major_preference,
            :clean, :noise, :sleep, :greeklife, :guests, :language, :cook, :smoke, :against_smoker, :drink, :against_drinker,
            :pets, :against_pet, :politics, :politics_preference, :religion,
            :religion_preference, :bio, :top_1, :top_2, :top_3, :profile_pic
        )""", user_data)
        user_id = cursor.lastrowid
        conn.commit()
    except sqlite3.IntegrityError as e:
        conn.rollback()
        raise e

    return jsonify({ "user": user_id })
# needs to call match_roommates function in match.py 
@app.route('/get_matches')
def get_matches():
    user_id = request.args.get("user")

    # TODO compute matches with user``
    matches = [
        { "user_id": 320, "score": 0.5 },
        { "user_id": 20, "score": 0.7 },
    ]

    return jsonify(matches)

@app.route('/user')
def user():
    user_id = request.args.get("user")

    # TODO retrieve user data from db
    user_data = { "field1": 0, "field2": 1 }

    return jsonify(user_data)

if __name__ == '__main__':


    app.run(debug=True)
