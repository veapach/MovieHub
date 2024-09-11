import React from 'react';
import './FilmCard.css';

const FilmCard = ({ film }) => {
  return (
    <a href={`/film/${film.id}`} className="film-card card">
      <div className="poster-container">
        {/* Вертикальный постер */}
        <img src={`http://localhost:8080/static/posters/${film.poster}`} alt={film.name} className="film-poster" />
        {/* Рейтинг в углу постера */}
        <div className="rating-badge">
          <span>{film.rating}</span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{film.name}</h5>
        <p className="card-genre"><strong>Жанр:</strong> {film.genre}</p>
        <p className="card-year"><strong>Год выпуска:</strong> {film.year_of_release}</p>
      </div>
    </a>
  );
};

export default FilmCard;
