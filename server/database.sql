-- Создаем таблицу пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    registration_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isadmin BOOLEAN DEFAULT FALSE,
    subscribers INTEGER[], -- Массив id пользователей, которые подписаны на этого пользователя
    subscriptions INTEGER[], -- Массив id пользователей, на которых подписан данный пользователь
    friends INTEGER[] -- Массив id пользователей, которые являются друзьями
);

-- Создаем таблицу фильмов
CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    genre VARCHAR(50),
    year_of_release INTEGER,
    cast_members TEXT[], -- Массив строк, где каждая строка представляет собой имя и фамилию человека
    description TEXT,
    duration INTERVAL,
    trailer VARCHAR(255),
    is_serial BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 10) -- Рейтинг фильма от 0 до 10
);

-- Создаем таблицу для списка просмотра
CREATE TABLE watch_list (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE -- Id фильма, который пользователь хочет посмотреть
);

-- Создаем таблицу для просмотренных фильмов
CREATE TABLE watched_films (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE, -- Id просмотренного фильма
    review_id INTEGER REFERENCES reviews(id) ON DELETE SET NULL,
    date_of_watching TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Создаем таблицу для отзывов
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
    review TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 10), -- Рейтинг отзыва от 0 до 10
    date_of_review TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
