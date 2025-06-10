// src/data/movies.js

/**
 * Массив всех фильмов для страницы «Все фильмы».
 *
 * Поля каждого объекта:
 * - id: уникальный идентификатор (строка)
 * - slug: «читаемый» URL-фрагмент, например "avatar-the-way-of-water"
 * - title: полное название фильма
 * - poster: путь к изображению постера (в папке public/images/)
 * - genres: массив жанров (строк), например ["Action", "Adventure", "Fantasy"]
 * - experience: массив форматов просмотра (строк), например ["2D", "IMAX", "3D"]
 * - duration: длина фильма (например, "2h 58m")
 * - rating: возрастной рейтинг (например, "12A", "15", "PG")
 *
 * С этим набором данных мы сможем фильтровать по жанру/формату и осуществлять поиск.
 */

const movies = [
  {
    id: "puss",
    slug: "puss-in-boots-the-last-wish",
    title: "Puss in Boots: The Last Wish",
    poster: "/images/puss-in-boots.jpg",
    cover: "/images/puss-full.jpg",
    gallery: [
      "/images/puss-gallery1.jpg", // вам нужно будет положить эти изображения в public/images/
      "/images/puss-gallery2.jpg",
    ],
    genres: ["Animation", "Adventure", "Comedy"],
    experience: ["2D", "3D"],
    duration: "1h 42m",
    rating: "PG",
    showtimes: [
      { time: "12:00", format: "2D" },
      { time: "14:20", format: "2D" },
      { time: "17:30", format: "3D" },
      { time: "22:20", format: "3D" },
    ],

    language: "English (original)",
    subtitles: "English subtitles",
    synopsis:
      "When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through " +
      "eight of his nine lives, " +
      "he launches an epic journey to restore them by finding the mythical Last Wish.", // можете заменить на любой текст
    director: "Joel Crawford, Januel Mercado",
    cast: ["Paul Fisher", "Tommy Swerdlow", "Tom Wheeler"],
    releaseDate: "21 December 2022",
    formats: ["2D", "3D"],
    trailerUrl: "https://www.youtube.com/embed/xgZLXyqbYOc",
    previewUrl: "/images/puss-in-boots.jpg",
    logoUrl: "/assets/logos/avatar-logo.png",
  },

  {
    id: "violent",
    slug: "vviolent-night",
    title: "Violent Night",
    poster: "/images/violent-night.jpg",
    cover: "/images/violet-full.jpg",
    gallery: [
      "/images/violent-gallery1.jpg", // вам нужно будет положить эти изображения в public/images/
      "/images/violent-gallery2.jpg",
    ],
    genres: ["Action", "Comedy", "Crime"],
    experience: ["2D"],
    duration: "1h 52m",
    rating: "15",
    showtimes: [
      { time: "09:00", format: "2D" },
      { time: "13:40", format: "2D" },
      { time: "17:30", format: "2D" },
    ],

    language: "English (original)",
    subtitles: "English subtitles",
    synopsis:
      "When an elite team of mercenaries breaks into a family compound on Christmas Eve, " +
      "a disgruntled Santa Claus must take them " +
      "out to save both the hostages and his Holiday.", // можете заменить на любой текст
    director: "Tommy Wirkola",
    cast: ["Pat Casey", "Josh Miller"],
    releaseDate: "2 December 2022",
    formats: ["2D", "8D"],
    trailerUrl: "https://www.youtube.com/embed/a53e4HHnx_s",
    previewUrl: "/images/violent-night.jpg",
    logoUrl: "/assets/logos/avatar-logo.png",
  },

  {
    id: "spoiler",
    slug: "spoiler-alert",
    title: "Spoiler Alert",
    poster: "/images/spoiler-alert.jpg",
    cover: "/images/spoiler-full.jpg",
    gallery: [
      "/images/spoiler-gallery1.jpg", // вам нужно будет положить эти изображения в public/images/
      "/images/spoiler-gallery2.jpg",
    ],
    genres: ["Drama", "Comedy"],
    experience: ["2D"],
    duration: "1h 52m",
    rating: "PG-13",
    showtimes: [
      { time: "11:00", format: "2D" },
      { time: "22:30", format: "2D" },
    ],

    language: "English (original)",
    subtitles: "English subtitles",
    synopsis:
      "The story of Michael Ausiello and Kit Cowan's relationship, " +
      "which takes a tragic turn when Cowan is " +
      "diagnosed with terminal cancer.", // можете заменить на любой текст
    director: "Michael Showalter",
    cast: ["David Marshall Grant", "Dan Savage", "Michael Ausiello"],
    releaseDate: "2 December 2022",
    formats: ["2D"],
    trailerUrl: "https://www.youtube.com/embed/G9qIwkAi_Zk",
    previewUrl: "/images/spoiler-alert.jpg",
    logoUrl: "/assets/logos/avatar-logo.png",
  },

  {
    id: "bullet",
    slug: "bullet-train",
    title: "Bullet Train",
    poster: "/images/bullet-train.jpg",
    cover: "/images/bullet-full.jpg",
    gallery: [
      "/images/bullet-gallery1.jpg", // вам нужно будет положить эти изображения в public/images/
      "/images/bullet-gallery2.jpg",
    ],
    genres: ["Action", "Comedy", "Thriller"],
    experience: ["2D", "IMAX"],
    duration: "1h 52m",
    rating: "R",
    showtimes: [
      { time: "13:20", format: "2D" },
      { time: "17:00", format: "2D" },
      { time: "21:00", format: "IMAX" },
    ],

    language: "English (original)",
    subtitles: "English subtitles",
    synopsis:
      "The story of Michael Ausiello and Kit Cowan's relationship, " +
      "which takes a tragic turn when Cowan is " +
      "diagnosed with terminal cancer.", // можете заменить на любой текст
    director: "David Leitch",
    cast: ["Zak Olkewicz", "Kôtarô Isaka"],
    releaseDate: "5 August 2022",
    formats: ["2D", "IMAX"],
    trailerUrl: "https://www.youtube.com/embed/0IOsk2Vlc4o",
    previewUrl: "/images/bullet-train.jpg",
    logoUrl: "/assets/logos/avatar-logo.png",
  },

  {
    id: "avatar",
    slug: "avatar-the-way-of-water",
    title: "Avatar: The Way of Water",
    poster: "/images/avatar.jpg",
    cover: "/images/avatar-full.jpg",
    gallery: [
      "/images/avatar-gallery1.jpg", // вам нужно будет положить эти изображения в public/images/
      "/images/avatar-gallery2.jpg",
    ],
    genres: ["Action", "Adventure", "Fantasy"],
    experience: ["2D", "3D", "IMAX"],
    duration: "2h 58m",
    rating: "12A",
    showtimes: [
      { time: "10:00", format: "2D" },
      { time: "14:00", format: "2D" },
      { time: "18:30", format: "3D" },
      { time: "20:00", format: "3D" },
      { time: "23:30", format: "IMAX" },
    ],

    language: "English (original)",
    subtitles: "English subtitles",
    synopsis:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. " +
      "Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri " +
      "and the army of the Na'vi race to protect their home.", // можете заменить на любой текст
    director: "James Cameron",
    cast: [
      "Sam Worthington",
      "Zoe Saldaña",
      "Sigourney Weaver",
      "Stephen Lang",
    ],
    releaseDate: "15 December 2022",
    formats: ["2D", "3D", "IMAX", "IMAX 3D"],
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
    previewUrl: "/images/avatar.jpg",
    logoUrl: "/assets/logos/avatar-the-way-of-water.png",
  },
  {
    id: "iwanna",
    slug: "i-wanna-dance-with-somebody",
    title: "I Wanna Dance with Somebody",
    poster: "/images/iwanna.jpg",
    cover: "/images/iwanna-full.jpg",
    gallery: [
      "/images/iwanna-gallery1.jpg", // вам нужно будет положить эти изображения в public/images/
      "/images/bullet-gallery2.jpg",
    ],
    genres: ["Action", "Comedy", "Thriller"],
    experience: ["2D"],
    duration: "2h 42m",
    rating: "PG-13",
    showtimes: [
      { time: "12:00", format: "2D" },
      { time: "16:30", format: "2D" },
    ],

    language: "English (original)",
    subtitles: "English subtitles",
    synopsis:
      "A joyous, emotional, heartbreaking celebration of the life and music of Whitney Houston, " +
      " one of the greatest female R&B pop vocalists of all time, " +
      "tracking her journey from obscurity to musical super stardom.", // можете заменить на любой текст
    director: "Kasi Lemmons",
    cast: ["Anthony McCarten", "Anthony McCarten", "Ashton Sanders"],
    releaseDate: "22 December 2022",
    formats: ["2D"],
    trailerUrl: "https://www.youtube.com/embed/9tfemzaMkoU",
    previewUrl: "/images/iwanna.jpg",
    logoUrl: "/assets/logos/avatar-logo.png",
  },
];

export default movies;
