import itertools

# Basic matching roommate algorithm
def match_roommates(users):
    matches = []

    # Get hobbies from the junction table
    user_hobbies = get_user_hobbies_from_db()

    for user1, user2 in itertools.combinations(users, 2):
        # Must Match Criteria
        if user1['gender_preference'] != 'No Preference' and user1['gender_preference'] != user2['gender']:
            continue
        if user2['gender_preference'] != 'No Preference' and user2['gender_preference'] != user1['gender']:
            continue
        if user1['housing'] != user2['housing']:
            continue
        if user1['housing'] == 'On-Campus' and user1['year'] != user2['year']:
            continue
        if user1['against_smoker'] == 'Yes' and user2['smoke'] == 'Yes': # change this from must match?
            continue
        if user2['against_smoker'] == 'Yes' and user1['smoke'] == 'Yes':
            continue
        if user1['against_drinker'] == 'Yes' and user2['drink'] == 'Yes':
            continue
        if user2['against_drinker'] == 'Yes' and user1['drink'] == 'Yes':
            continue
        if user1['against_pet'] == 'Yes' and user2['pets'] != 'None':
            continue
        if user2['against_pet'] == 'Yes' and user1['pets'] != 'None':
            continue

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
        user1_hobbies = user_hobbies.get(user1['userID'], set())
        user2_hobbies = user_hobbies.get(user2['userID'], set())

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

        score = max(score, 0)  # Make sure score doesn't go in the negatives

        if score < 11:  # Only keeping Excellent and Good score matches
          matches.append((user1['userID'], user2['userID'], score))

    # Sort matches by ascending score (closest users first)
    matches.sort(key=lambda x: x[2], reverse=False)
    return matches