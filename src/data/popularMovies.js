// src/data/popularMovies.js

/**
 * Массив «популярных фильмов». Каждый объект описывает один слайд:
 * - id: уникальный идентификатор (строка или число)
 * - title: название фильма
 * - imageUrl: путь к картинке-постеру (файл в public/images/)
 * - genre: строка с жанрами через « · »
 * - duration: длительность, например «2h 58m»
 * - rating: рейтинг фильма (например «12A» или «15»)
 */

const popularMovies = [
  {
    id: "avatar",
    title: "Avatar: The Way of Water",
    imageUrl: "/images/avatar.jpg",
    genre: "Action · Adventure · Fantasy",
    duration: "2h 58m",
    rating: "12A",
  },
  {
    id: "puss",
    title: "Puss in Boots: The Last Wish",
    imageUrl: "/images/puss-in-boots.jpg",
    genre: "Animation · Adventure · Comedy",
    duration: "1h 42m",
    rating: "PG",
  },
  {
    id: "violent",
    title: "Violent Night",
    imageUrl: "/images/violent-night.jpg",
    genre: "Action · Comedy · Crime",
    duration: "1h 52m",
    rating: "15",
  },
  {
    id: "spoiler",
    title: "Spoiler Alert",
    imageUrl: "/images/spoiler-alert.jpg",
    genre: "Comedy · Drama",
    duration: "1h 52m",
    rating: "12A",
  },
  {
    id: "bullet",
    title: "Bullet Train",
    imageUrl: "/images/bullet-train.jpg",
    genre: "Action · Comedy · Thriller",
    duration: "2h 7m",
    rating: "15",
  },
];

export default popularMovies;
