import sqlite3

def get_user(cursor, user_id):
    cursor.execute("SELECT * FROM roommate_profiles WHERE userID = ?", (user_id,))
    user_row = cursor.fetchone()
    if user_row is None:
        raise Exception("no uzerr found :(((")
    
    user_data = dict(sqlite3.Row(cursor, user_row))
    return user_data

# returns a set of hobbyIDs for a user
def get_user_hobbies(cursor, user_id):
    cursor.execute("SELECT hobbyID FROM user_hobbies WHERE userID = ?", (user_id,))
    hobbies = set(hobby for (hobby,) in cursor.fetchall())
    return hobbies

def get_score(cursor, user_id1, user_id2):
    user1 = get_user(cursor, user_id1)
    user2 = get_user(cursor, user_id2)

   # Must Match Criteria
    if user1['gender_preference'] != 'No Preference' and user1['gender_preference'] != user2['gender']:
        return 0
    if user2['gender_preference'] != 'No Preference' and user2['gender_preference'] != user1['gender']:
        return 0
    if user1['housing'] != user2['housing']:
        return 0
    if user1['housing'] == 'On-Campus' and user1['year'] != user2['year']:
        return 0
    if user1['against_smoker'] == 'Yes' and user2['smoke'] == 'Yes': # change this from must match?
        return 0
    if user2['against_smoker'] == 'Yes' and user1['smoke'] == 'Yes':
        return 0
    if user1['against_drinker'] == 'Yes' and user2['drink'] == 'Yes':
        return 0
    if user2['against_drinker'] == 'Yes' and user1['drink'] == 'Yes':
        return 0
    if user1['against_pet'] == 'Yes' and user2['pets'] != 'None':
        return 0
    if user2['against_pet'] == 'Yes' and user1['pets'] != 'None':
        return 0

    score = 0

    # Dissimilarity scoring
    distance = 0

    # Preferences with dissimilarity scale (0-3 based on distance)
    distance += abs(['Very Messy', 'Somewhat Messy', 'Somewhat Clean', 'Very Clean'].index(user1['clean']) -
                        ['Very Messy', 'Somewhat Messy', 'Somewhat Clean', 'Very Clean'].index(user2['clean']))
    distance += abs(['Very Loud', 'Somewhat Loud', 'Somewhat Quiet', 'Very Quiet'].index(user1['noise']) -
                        ['Very Loud', 'Somewhat Loud', 'Somewhat Quiet', 'Very Quiet'].index(user2['noise']))
    distance +=  abs(['Before 10PM','11PM - 12AM', '12AM - 2AM','2AM or Later'].index(user1['sleep']) -
                        ['Before 10PM','11PM - 12AM', '12AM - 2AM','2AM or Later'].index(user2['sleep']))
    distance +=  abs(['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user1['guests']) -
                        ['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user2['guests']))
    distance +=  abs(['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user1['cook']) -
                        ['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user2['cook']))

    # Black-and-white preference distances (0 point if match; 1 point if no match)
    if user1['major_preference'] != 'No Preference' and user1['major_preference'] != user2['major']:
        score += 1
    if user2['major_preference'] != 'No Preference' and user2['major_preference'] != user1['major']:
        score += 1
    if user1['politics_preference'] != 'No Preference' and user1['politics_preference'] != user2['politics']:
        score += 1
    if user2['politics_preference'] != 'No Preference' and user2['politics_preference'] != user1['politics']:
        score += 1
    if user1['religion_preference'] != 'No Preference' and user1['religion_preference'] != user2['religion']:
        score += 1
    if user2['religion_preference'] != 'No Preference' and user2['religion_preference'] != user1['religion']:
        score += 1
    if user1['greeklife'] != user2['greeklife']:
        score += 1
    if user1['language'] != user2['language']:
        score += 1

    # Default hobbies score (starting at 0, add for mismatches)
    hobbies_score = 0

    # Retrieve hobbies from the dictionary
    user1_hobbies = get_user_hobbies(cursor, user_id1)
    user2_hobbies = get_user_hobbies(cursor, user_id2)

    hobbies_score = len(user1_hobbies.symmetric_difference(user2_hobbies))

    # Add hobbies dissimilarity score to total distance score
    score += distance + hobbies_score

    # account for weights
    # scaled distance: clean, quiet, sleep, guests, cook
    # black and white preference: major_preference, politics_preference, religion_preference, greek_life, language, hobbies

    shared_hobbies = len(user1_hobbies & user2_hobbies)

    top_3_user1 = [user1['top_3'], user1['top_2'], user1['top_1']]
    top_3_user2 = [user2['top_3'], user2['top_2'], user2['top_1']]

    # Iterate over both users' top preferences
    for i, var in enumerate(top_3_user1 + top_3_user2):
        weight = ((i % 3) + 1) * 0.5  # 0.5 = Top 3, 1 = Top 2, 1.5 = Top 1
        user = user1 if i < 3 else user2  # First 3 are user1's, last 3 are user2's
        if var.endswith(' preference'):
            var = var.replace(' preference', '_preference')
            stripped_var = var.split('_preference')[0]
            if (user[var] == 'No Preference' or user[var] == user2[stripped_var]) and \
                (user2[var] == 'No Preference' or user2[var] == user1[stripped_var]):
                score -= weight  # Better match
            else:
                score += weight  # Worse match
        elif var == 'hobbies':
            if shared_hobbies >= 3:
                score -= weight + 1.5
            elif shared_hobbies == 2:
                score -= weight + 1
            elif shared_hobbies == 1:
                score -= weight + 0.5
            else:
                score += weight + 1.5
        else:
            if user1[var] == user2[var]:
                score -= weight  # Reward for matching
            else:
                score += weight  # Penalty for mismatch

    score = max(score, 0)

    return score

# OUR MATCHING ALGORITHM 
def get_matches(cursor, user_id, count=10):
    # 1. get the top 'count' users, with a score greater than zero
    user_scores = []

    cursor.execute("SELECT userID FROM roommate_profiles")
    for (roommate_id,) in cursor.fetchall():
        print(f"USER: {user_id} {type(user_id)} ROOMIE: {roommate_id} {type(roommate_id)}")
        if roommate_id == user_id:
            continue

        score = get_score(cursor, user_id, roommate_id)
        user_scores.append({"user_id": roommate_id, "score": score})

    user_scores.sort(key=lambda obj: obj['score'], reverse=True)
    user_scores = user_scores[:count]

    # 2. if there are less than top 'count' users, use content filtering system

    # TODO add content-based filtering rec system code! in get_matches

    return user_scores