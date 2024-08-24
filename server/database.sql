create TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255),
    email VARCHAR(255),
    user_pass VARCHAR(255),
    registration_date DATE,
    isAdmin BOOLEAN
);

create TABLE films(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    genre VARCHAR(255),
    year_of_release DATE,
    film_cast TEXT [],
    description TEXT,
    duration TIME,
    trailer TEXT,
    isSerial BOOLEAN

);

create TABLE watch_list(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    film_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);

create TABLE reviews(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    film_id INTEGER,
    review TEXT,
    rating INTEGER,
    date_of_review DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);
