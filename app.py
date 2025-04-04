# Main Flask App placeholders 
import sqlite3
import flask
from flask_cors import CORS
from flask import Flask, request, jsonify

DATABASE_PATH = 'roomie_match.db'

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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

@app.route('/update_user', methods=['POST'])
def update_user():
    updated_data = request.json
    conn = get_db()
    cursor = conn.cursor()
    try:
        # Replace column names as necessary to match your table schema.
        cursor.execute("""
            UPDATE roommate_profiles
            SET firstname = :name,
                case_email = :email,
                bio = :bio,
                profile_pic = :profileImage
            WHERE userID = :userID
        """, {
            'name': updated_data.get("name"),
            'email': updated_data.get("email"),
            'bio': updated_data.get("bio"),
            'profileImage': updated_data.get("profileImage"),
            'userID': updated_data.get("userID")  # Ensure you pass the userID from the frontend if needed.
        })
        conn.commit()
        print("Update successful, rows affected:", cursor.rowcount)  # Log number of rows updated
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "error": str(e)}), 500
    return jsonify({"success": True})


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

@app.route('/delete_user', methods=['POST'])
def delete_user():
    data = request.json
    email = data.get("email")
    if not email:
        return jsonify({"success": False, "error": "Email is required"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM roommate_profiles WHERE case_email = ?", (email,))
    conn.commit()

    return jsonify({"success": True})


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


    app.run(debug=True, host='0.0.0.0', port=8000)
