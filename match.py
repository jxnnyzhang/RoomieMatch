import sqlite3
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

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
    distance += 2 * abs(['Very Messy', 'Somewhat Messy', 'Somewhat Clean', 'Very Clean'].index(user1['clean']) -
                        ['Very Messy', 'Somewhat Messy', 'Somewhat Clean', 'Very Clean'].index(user2['clean']))
    distance += 2 * abs(['Very Loud', 'Somewhat Loud', 'Somewhat Quiet', 'Very Quiet'].index(user1['noise']) -
                        ['Very Loud', 'Somewhat Loud', 'Somewhat Quiet', 'Very Quiet'].index(user2['noise']))
    distance += 2 * abs(['Before 10PM','11PM - 12AM', '12AM - 2AM','2AM or Later'].index(user1['sleep']) -
                        ['Before 10PM','11PM - 12AM', '12AM - 2AM','2AM or Later'].index(user2['sleep']))
    distance += 2 * abs(['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user1['guests']) -
                        ['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user2['guests']))
    distance +=  abs(['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user1['cook']) -
                        ['Never', '1-2 times/week', '3-4 times/week', 'Everyday'].index(user2['cook']))

    # Black-and-white preference distances (0 point if match; 1 point if no match)
    if user1['major_preference'] != 'No Preference' and user1['major_preference'] != user2['major']:
        score += 2
    if user2['major_preference'] != 'No Preference' and user2['major_preference'] != user1['major']:
        score += 2
    if user1['politics_preference'] != 'No Preference' and user1['politics_preference'] != user2['politics']:
        score += 2
    if user2['politics_preference'] != 'No Preference' and user2['politics_preference'] != user1['politics']:
        score += 2
    if user1['religion_preference'] != 'No Preference' and user1['religion_preference'] != user2['religion']:
        score += 2
    if user2['religion_preference'] != 'No Preference' and user2['religion_preference'] != user1['religion']:
        score += 2
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

# Function to retrieve users from the database
def get_users_from_db(cursor):
    cursor.execute("SELECT * FROM roommate_profiles")

    # Get column names
    columns = [desc[0] for desc in cursor.description]

    # Convert rows to dictionaries
    users = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return users

def get_already_matched_users(matches):
    # Extract the matched pairs of user IDs
    matched_pairs = []
    for match in matches:
        user1, user2 = match[0], match[1]
        matched_pairs.append((user1, user2))
        matched_pairs.append((user2, user1))
    return matched_pairs

def get_rejected_users(cursor, userID):
    """Retrieve a list of users that the given user has rejected and their attributes."""
    query = """SELECT u.*
    FROM roommate_profiles u
    INNER JOIN user_rejections r ON u.userID = r.rejectedUserID
    WHERE r.userID = ?"""

    cursor.execute(query, (userID,))

    columns = [desc[0] for desc in cursor.description]
    results = cursor.fetchall()  # Fetch results

    return pd.DataFrame(results, columns=columns)

# Final Rec system to add to API
# A content-based recommendation system, used in addition to the main matching algorithm.
# Recommends alternative matches that are not Excellent or Good matches from the main algorithm.
# Based on cosine similarity and decreases similarity score for potential matches if
# too similar to the user's rejected users so that they are not prioritized.
def recommend_alternatives(cursor, userID, users_df, matches, num_recommendations=5):
    # Get already matched user pairs and rejected users
    matched_pairs = get_already_matched_users(matches)
    rejected_users = get_rejected_users(cursor, userID)
    rejected_users = rejected_users['userID'].tolist()

    # Drop irrelevant columns
    features_df = users_df.drop(columns=['userID', 'firstname', 'lastname', 'case_email', 'profile_pic', 'bio', 'submission_timestamp'])

    # Get the user's year and housing type
    user_info = users_df[users_df['userID'] == userID].iloc[0]
    user_year = user_info['year']
    user_housing = user_info['housing']
    user_gender = user_info['gender']
    user_gender_preference = user_info['gender_preference']

    # Feature mappings to numeric
    clean_mapping = {'Very Messy': 1, 'Somewhat Messy': 2, 'Somewhat Clean': 3, 'Very Clean': 4}
    noise_mapping = {'Very Loud': 1, 'Somewhat Loud': 2, 'Somewhat Quiet': 3, 'Very Quiet': 4}
    sleep_mapping = {'Before 10PM': 1, '11PM - 12AM': 2, '12AM - 2AM': 3, '2AM or Later': 4}
    guests_mapping = {'Never': 0, '1-2 times/week': 1, '3-4 times/week': 2, 'Everyday': 3}
    cook_mapping = {'Never': 0, '1-2 times/week': 1, '3-4 times/week': 2, 'Everyday': 3}

    # Apply mappings
    features_df['clean'] = features_df['clean'].map(clean_mapping)
    features_df['noise'] = features_df['noise'].map(noise_mapping)
    features_df['sleep'] = features_df['sleep'].map(sleep_mapping)
    features_df['guests'] = features_df['guests'].map(guests_mapping)
    features_df['cook'] = features_df['cook'].map(cook_mapping)

    # One-hot encode categorical features
    categorical_cols = ['gender', 'gender_preference', 'major', 'major_preference', 'greeklife',
                        'smoke', 'drink', 'pets', 'against_pet',
                        'politics', 'politics_preference', 'religion', 'religion_preference',
                        'top_1', 'top_2', 'top_3']

    encoder = OneHotEncoder()
    encoded_categorical = encoder.fit_transform(features_df[categorical_cols]).toarray()

    # Standardize numerical features
    numerical_cols = ['clean', 'noise', 'sleep', 'guests', 'cook']
    scaler = StandardScaler()
    standardized_numerical = scaler.fit_transform(features_df[numerical_cols])

    # Combine encoded categorical and numerical data
    user_feature_matrix = np.hstack((encoded_categorical, standardized_numerical))

    # Calculates the cosine similarity
    similarity_matrix = cosine_similarity(user_feature_matrix)

    # Find index of the target user
    user_index = users_df[users_df['userID'] == userID].index[0]

    # Get similarity scores for all users
    similarity_scores = list(enumerate(similarity_matrix[user_index]))

    # Initialization for the list of recommendations
    recommended_users = []

    for i, score in similarity_scores:

        # Get the potential matchs' id, year, and housing type
        match_user_id = users_df.iloc[i]['userID']
        match_year = users_df.iloc[i]['year']
        match_housing = users_df.iloc[i]['housing']
        match_gender = users_df.iloc[i]['gender']
        match_gender_preference = users_df.iloc[i]['gender_preference']

        # Check must match criteria and if user has already been matched or rejected
        if (score > 0 and match_user_id != userID and
            match_user_id not in rejected_users and
            (userID, match_user_id) not in matched_pairs and
            (match_user_id, userID) not in matched_pairs and
            match_year == user_year and  # Must match year
            match_housing == user_housing and # Must match housing
            (user_gender_preference == 'No Preference' or user_gender_preference == match_gender) and
            (match_gender_preference == 'No Preference' or match_gender_preference == user_gender)): # Must match gender

            # New variable for the changing scores
            adjusted_score = score

            # Check similarity to rejected users to determine if should penalize or not
            for rejected_user in rejected_users:
                if rejected_user in users_df['userID'].values:
                    rejected_user_index = users_df[users_df['userID'] == rejected_user].index[0]
                    match_user_index = users_df[users_df['userID'] == match_user_id].index[0]  # Get index of the potential match
                    rejected_similarity = similarity_matrix[match_user_index, rejected_user_index]  # Compare their similarity

                    # Apply progressive penalties based on the similarity score
                    if rejected_similarity > 0.6:  # If similarity is high
                        adjusted_score *= 0.6  # Strong penalty
                    elif rejected_similarity > 0.5:  # If similarity is moderately high
                        adjusted_score *= 0.7  # Medium penalty
                    elif rejected_similarity > 0.4:  # If similarity is somewhat high
                        adjusted_score *= 0.8  # Mild penalty

            # Apply the adjusted similarity score to the current potential match
            recommended_users.append((match_user_id, adjusted_score))

        # Stop when we have the required number of recommendations
        if len(recommended_users) >= num_recommendations:
            break

    # Sort by similarity score (highest first)
    recommended_users.sort(key=lambda x: x[1], reverse=True)

    return recommended_users


# OUR MATCHING ALGORITHM 
def get_matches(cursor, user_id, count=10):
    # 1. get the top 'count' users, with a score greater than zero
    user_scores = []

    cursor.execute("SELECT userID FROM roommate_profiles")
    for (roommate_id,) in cursor.fetchall():
        if roommate_id == user_id:
            continue

        score = get_score(cursor, user_id, roommate_id)
        user_scores.append({"user_id": roommate_id, "score": score})

    # all (user, roommate) pairs
    matches = [(user_id, us['user_id']) for us in user_scores]

    user_scores.sort(key=lambda obj: obj['score'], reverse=True)
    user_scores = user_scores[:count]

    if len(user_scores) == count:
        # we found enough users, so return them
        return user_scores

    # 2. if there are less than top 'count' users, use content filtering system
    users_df = pd.DataFrame(get_users_from_db(cursor, ))
    recommendations = recommend_alternatives(cursor, user_id, users_df, matches)
    
    # only keep the ones we need
    recommendations = recommendations[:count - len(user_scores)]
    for rank, (match_id, adjusted_score) in enumerate(recommendations, start=1):
        user_scores.append[{"user_id": match_id, "score": adjusted_score}]

    return user_scores