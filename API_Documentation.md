# Документация к API MovieHub

## /api/user:

  1. `POST` /registration
    В body запроса указывать nickname(string), email(string), password(string), avatar(file), role(USER|ADMIN, default - USER), reg_date(не обязателен, по дефолту будет date.now)
    запрос возвращает токен jwt пользователя

  2. `POST` /login
    В body запроса указывать email(string), password(string)
    запрос возвращает токен jwt пользователя

  3. `GET` /auth
    возвращает token

  4. `GET` /getall
    Возвращает всех юзеров

  5. `GET` /{user_id} (просто цифра после /)
    Возвращает определенного юзера по id

  6. `PUT` /edit?id={user_id} (id=id пользователя)
    Изменение пользователя по ID
    в body указывать nickname(string), email(string), password(string), avatar(file)
    возвращает обновленного юзера

  7. `DELETE` /{user_id} (id=id пользователя)
    Удаляет пользователя по ID

  8. `PUT` /add_friend?id={user_id}
    Добавляет пользователя в друзья
    в body указать friendId - ID пользователя на которого будут подписываться
    Если пользователя подписаны друг на друга, то добавляются в список друзей

## /api/film:
  1. `POST` 
    Создание фильма. Запрос проверяет есть ли у пользователя права ADMIN(с помощью токена, который нужно указать в headers. Ключ - Authorization, Value - Bearer `{token}`(после слова Bearer пробел))
    В body указывать `name(string), genre(string), year_of_release(string), cast_members(string || array(string)), description(text), duration(string), trailer(string), rating(string)`
    Возвращает созданный фильм
    В файлы загружать постер фильма. В БД будет случайное название этого файла .jpg 

  2. `GET` 
    Возвращает все фильмы если пустой запрос
    Но в query можно указать чтобы вернул фильмы только с определенным жанром или с рейтингом больше или равен какому-то. Можно объеденить два условия. Можно указать лимит сколько фильмов возвращать максимум, а также какая страница. Пример - `api/film?genre=Фантастика&rating=9&limit=3&page=1`
  
  3. `GET` /{film_id}
    Возвращает фильм с указанным ID
  
  4. `PUT` /edit?id={film_id}
    Редактирование фильма
    Запрос проверяет есть ли у пользователя права ADMIN(с помощью токена, который нужно указать в headers. Ключ - Authorization, Value - Bearer `{token}`(после слова Bearer пробел))
    В body добавлять все что нужно изменить по ключам. Не обязательно указывать все, можно только то что нужно изменить. 
    `name(string), genre(string), year_of_release(string), cast_members(string || array(string)), description(text), duration(string), trailer(string), rating(string) `
    В файлы можно приложить новый постер. Он сохраниться в папку server/static. В БД будет случайное название этого файла .jpg 
    Возвращает измененный фильм
  
  5. `DELETE` /{film_id}
    Запрос проверяет есть ли у пользователя права ADMIN(с помощью токена, который нужно указать в headers. Ключ - Authorization, Value - Bearer `{token}`(после слова Bearer пробел))
    Удаляет фильм по ID

## /api/serial:
  1. `POST` 
    Создание сериала. Запрос проверяет есть ли у пользователя права ADMIN(с помощью токена, который нужно указать в headers. Ключ - Authorization, Value - Bearer `{token}`(после слова Bearer пробел))
    В body указывать `name,
        genre,
        year_of_start,
        year_of_ending,
        cast_members,
        description,
        seasons,
        episodes_in_season,
        duration_of_episode,
        trailer,
        rating,`
    Возвращает созданный сериал
    В файлы загружать постер сериала. В БД будет случайное название этого файла .jpg 

  2. `GET` 
    Возвращает все сериалы если пустой запрос
    Но в query можно указать чтобы вернул сериалы только с определенным жанром или с рейтингом больше или равен какому-то. Можно объеденить два условия. Можно указать лимит сколько сериалов возвращать максимум, а также какая страница. Пример - `api/serial?genre=Фантастика&rating=9&limit=3&page=1`
  
  3. `GET` /{serial_id}
    Возвращает сериал с указанным ID
  
  4. `PUT` /edit?id={serial_id}
    Редактирование сериала
    Запрос проверяет есть ли у пользователя права ADMIN(с помощью токена, который нужно указать в headers. Ключ - Authorization, Value - Bearer `{token}`(после слова Bearer пробел))
    В body добавлять все что нужно изменить по ключам. Не обязательно указывать все, можно только то что нужно изменить. 
    `name,
        genre,
        year_of_start,
        year_of_ending,
        cast_members,
        description,
        seasons,
        episodes_in_season,
        duration_of_episode,
        trailer,
        rating, `
    В файлы можно приложить новый постер. Он сохраниться в папку server/static. В БД будет случайное название этого файла .jpg 
    Возвращает измененный сериал
  
  5. `DELETE` /{serial_id}
    Запрос проверяет есть ли у пользователя права ADMIN(с помощью токена, который нужно указать в headers. Ключ - Authorization, Value - Bearer `{token}`(после слова Bearer пробел))
    Удаляет сериал по ID

## /api/review

  1. `POST` 
    Создание отзыва
    В body указывать user_id, film_id, review_text(text), rating(int), date_of_review(по дефолту date.now)
    Возвращает созданный отзыв
  
  2. `GET`
    Возвращает все отзывы
  
  3. `GET` /user?id={user_id}
    Возращает все отзывы от пользователя с ID
  
  4. `GET` /film?id={film_id}
    Возвращает все отзывы к фильму с ID

  5. `GET` /getReview?user_id={user_id}&film_id={film_id}
    Возвращает отзыв от определенного пользователя к определенному фильму
  
  6. `DELETE` /{review_id}
    Удаляет отзыв
  
  7. `PUT` /edit?id={review_id}
    Изменение отзыва
    в body указать review_text(text), rating(int), date_of_review(по дефолту date.now)
    Возвращает измененный отзыв
