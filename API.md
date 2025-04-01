# API functions

- `/create_user` adds a user to the database
    - usage: `POST` a json object to this endpoint containing all of the fields required to create a user
    - returns: user id
    - on the frontend, this will be what is called when a user submits the form.
    - on the backend, we check whether this user exists yet, and if not, inserts the user data into the users table.
- `/get_matches` retrieves matches for a user
    - usage: `GET` with a user id parameter
    - returns: list of user id matches and associated match score
    - on the frontend, this will be called to find and display potential matches
    - on the backend, this will run the matching algorithm for a user
- `/user` retrieves data for a user
    - usage: `GET` with a user id parameter
    - returns: associated user data

## potential future API

- replace, update, and/or delete users
