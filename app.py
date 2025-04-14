# Main Flask App  
import sqlite3
import flask
from flask import Flask, request, jsonify
import match

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
    return """
    <marquee>RoomieMatch API is running</marquee.
    """

@app.route('/create_user', methods=['POST'])
def create_user():
    user_data = request.json #Input data coming from frontend 

    conn = get_db()
    cursor = conn.cursor()

    # TO DO Edit below 
    try:
        # setting userID to none will cause it to automatically be filled in by the database
        user_data['userID'] = None
        cursor.execute("""INSERT INTO roommate_profiles VALUES (
            :userID,
            :firstname, :lastname, :case_email, :gender, :gender_preference, :housing, :year, :major, :major_preference,
            :clean, :noise, :sleep, :greeklife, :guests, :language, :cook, :smoke, :against_smoker, :drink, :against_drinker,
            :pets, :against_pet, :politics, :politics_preference, :religion,
            :religion_preference, :bio, :top_1, :top_2, :top_3, :profile_pic
        )""", user_data)
        user_id = cursor.lastrowid

        # TODO insert user hobbies into the `user_hobbies` table (done for now, but review)
        # Insert hobbies into user_hobbies table
        if 'hobbies' in user_data:
            for hobby in user_data['hobbies']:
                # Get the hobbyID from the hobbies table
                cursor.execute("SELECT hobbyID FROM hobbies WHERE hobby = ?", (hobby,))
                hobby_id = cursor.fetchone()
                if hobby_id:
                    # Insert the user-hobby pair into the user_hobbies table
                    cursor.execute("INSERT INTO user_hobbies (userID, hobbyID) VALUES (?, ?)", (user_id, hobby_id[0]))

        conn.commit() # Commit changes to db 

    except sqlite3.IntegrityError as e:
        conn.rollback() # Rollback if there's an error 
        raise e

    return jsonify({ "user": user_id })

# needs to call match_roommates function in match.py 
@app.route('/get_matches', methods=['GET'])
def get_matches():
    user_id = int(request.args.get("user"))

    cursor = get_db().cursor()
    matches = match.get_matches(cursor, user_id)

    return jsonify(matches)

@app.route('/user', methods=['GET'])
def user():
    user_id = int(request.args.get("user"))

    cursor = get_db().cursor()
    user_data = match.get_user(cursor, user_id)

    return jsonify(user_data)

@app.route('/accept', methods=['POST'])
def accept():
    user_id = int(request.args.get('user'))
    roommate_id = int(request.args.get('roommate'))

    conn = get_db()
    cursor = conn.cursor()
    # Insert user into accepted table 
    cursor.execute("INSERT INTO user_accepted VALUES(?, ?)", (user_id, roommate_id))
    conn.commit()

    # Optional: update user status to indicate a matched user?
    # cursor.execute("UPDATE roommate_profiles SET status = 'Matched' WHERE userID = ?", (user_id,))
    return jsonify({"message": "Roommie Match accepted!"}), 200

@app.route('/reject', methods=['POST'])
def reject():
    user_id = int(request.args.get('user'))
    roommate_id = int(request.args.get('roommate'))

    conn = get_db()
    cursor = conn.cursor()
    # Insert user into rejections table
    cursor.execute("INSERT INTO user_rejections VALUES(?, ?)", (user_id, roommate_id))
    conn.commit()
    return jsonify({"message": "Match rejected. "}), 200

if __name__ == '__main__':
    app.run(debug=True)

# Delete a user from any table (handles cascading deletes) 
@app.route('/delete', methods=['DELETE'])
def delete():
    user_id = int(request.args.get('user'))
    conn = get_db()
    cursor = conn.cursor()

    # Delete from roommate_profiles, user_accepted, user_rejections, user_hobbies, etc.
    cursor.execute("DELETE FROM user_accepted WHERE userID = ? OR acceptedUserID = ?", (user_id, user_id))
    cursor.execute("DELETE FROM user_rejections WHERE userID = ? OR rejectedUserID = ?", (user_id, user_id))
    cursor.execute("DELETE FROM user_hobbies WHERE userID = ?", (user_id,))
    cursor.execute("DELETE FROM roommate_profiles WHERE userID = ?", (user_id,))
    conn.commit()

    return jsonify({"message": "User deleted successfully."}), 200
