import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminPanel.css';

const AdminPanel = () => {
  const [films, setFilms] = useState([]);
  const [serials, setSerials] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'film', // 'film' or 'serial'
    description: '',
    releaseYear: '',
    genre: '',
    castMembers: '',
    duration: '',
    trailer: '',
    rating: '',
    seasons: '',
    episodesInSeason: '',
    durationOfEpisode: '',
    poster: null,
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const filmsResponse = await axios.get('http://localhost:8080/api/film');
      const serialsResponse = await axios.get('http://localhost:8080/api/serial');
      setFilms(filmsResponse.data.rows); // Adjusting based on API response structure
      setSerials(serialsResponse.data.rows); // Adjusting based on API response structure
    } catch (error) {
      console.error('Failed to fetch content', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewItem({
      ...newItem,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newItem.title.trim() === '') return; // Дополнительная проверка, чтобы избежать пустых записей

    const formData = new FormData();
    formData.append('name', newItem.title); // API expects 'name'
    formData.append('description', newItem.description);
    formData.append('genre', newItem.genre);
    formData.append('year_of_release', newItem.releaseYear); // For films
    formData.append('year_of_start', newItem.releaseYear); // For serials
    formData.append('year_of_ending', ''); // For serials, you need to set this if applicable
    formData.append('cast_members', newItem.castMembers.split(',')); // Assuming CSV input
    formData.append('duration', newItem.duration);
    formData.append('trailer', newItem.trailer);
    formData.append('rating', newItem.rating);
    formData.append('seasons', newItem.seasons); // For serials
    formData.append('episodes_in_season', newItem.episodesInSeason); // For serials
    formData.append('duration_of_episode', newItem.durationOfEpisode); // For serials
    formData.append('img', newItem.poster);

    try {
      if (newItem.type === 'film') {
        await axios.post('http://localhost:8080/api/film', formData);
      } else {
        await axios.post('http://localhost:8080/api/serial', formData);
      }
      fetchContent();
      setNewItem({
        title: '',
        type: 'film',
        description: '',
        releaseYear: '',
        genre: '',
        castMembers: '',
        duration: '',
        trailer: '',
        rating: '',
        seasons: '',
        episodesInSeason: '',
        durationOfEpisode: '',
        poster: null,
      });
    } catch (error) {
      console.error('Failed to add new item', error);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === 'film') {
        await axios.delete(`http://localhost:8080/api/film/${id}`);
      } else {
        await axios.delete(`http://localhost:8080/api/serial/${id}`);
      }
      fetchContent();
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  const handleEdit = async (id, type) => {
    // Add logic for editing existing film or serial
    // This can be done similarly to handleSubmit, using a PUT request
  };

  return (
    <div className="admin-panel">
      <h2>Админ Панель</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={newItem.title}
          onChange={handleInputChange}
          required
        />
        <select name="type" value={newItem.type} onChange={handleInputChange}>
          <option value="film">Фильм</option>
          <option value="serial">Сериал</option>
        </select>
        <input
          type="text"
          name="genre"
          placeholder="Жанр"
          value={newItem.genre}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Описание"
          value={newItem.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Год выпуска"
          value={newItem.releaseYear}
          onChange={handleInputChange}
          required
        />
        {newItem.type === 'serial' && (
          <>
            <input
              type="number"
              name="seasons"
              placeholder="Сезоны"
              value={newItem.seasons}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="episodesInSeason"
              placeholder="Эпизоды в сезоне"
              value={newItem.episodesInSeason}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="durationOfEpisode"
              placeholder="Продолжительность эпизода"
              value={newItem.durationOfEpisode}
              onChange={handleInputChange}
            />
          </>
        )}
        <input
          type="text"
          name="castMembers"
          placeholder="Актерский состав (CSV)"
          value={newItem.castMembers}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Продолжительность"
          value={newItem.duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="trailer"
          placeholder="Трейлер"
          value={newItem.trailer}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Рейтинг"
          value={newItem.rating}
          onChange={handleInputChange}
        />
        <input type="file" name="poster" onChange={handleInputChange} />
        <button type="submit">Добавить</button>
      </form>

      <h3>Фильмы</h3>
      <ul className="content-list">
        {films.map((film) => (
          <li key={film.id}>
            <div>{film.name}</div>
            <button onClick={() => handleEdit(film.id, 'film')}>Редактировать</button>
            <button onClick={() => handleDelete(film.id, 'film')}>Удалить</button>
          </li>
        ))}
      </ul>

      <h3>Сериалы</h3>
      <ul className="content-list">
        {serials.map((serial) => (
          <li key={serial.id}>
            <div>{serial.name}</div>
            <button onClick={() => handleEdit(serial.id, 'serial')}>Редактировать</button>
            <button onClick={() => handleDelete(serial.id, 'serial')}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
