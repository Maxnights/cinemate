import React, { useState, useMemo, useRef } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import moviesData from "../../data/movies";
import MovieCard from "../../components/movies/MovieCard";
import TrailerCarousel from "../../components/movies/TrailerCarousel";
import styles from "./index.module.css";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("showing"); // “showing” или “coming”
  const [expFilter, setExpFilter] = useState("All"); // фильтр Experience
  const [genreFilter, setGenreFilter] = useState("All"); // фильтр Genre

  // drag-to-scroll для фильтров
  const expRef = useRef(null);
  const genreRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const onDragStart = (e, ref) => {
    isDown.current = true;
    ref.current.classList.add(styles.dragging);
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };
  const onDragEnd = (ref) => {
    isDown.current = false;
    ref.current.classList.remove(styles.dragging);
  };
  const onDragMove = (e, ref) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  // табы статуса
  const statusTabs = [
    { key: "showing", label: "Showing now" },
    { key: "coming", label: "Coming soon" },
  ];

  // уникальные Experience и Genre
  const allExperiences = useMemo(() => {
    const setE = new Set();
    moviesData.forEach((m) => m.experience.forEach((e) => setE.add(e)));
    return ["All", ...Array.from(setE)];
  }, []);
  const allGenres = useMemo(() => {
    const setG = new Set();
    moviesData.forEach((m) => m.genres.forEach((g) => setG.add(g)));
    return ["All", ...Array.from(setG)];
  }, []);

  // финальный список после фильтров
  const filteredMovies = useMemo(
    () =>
      moviesData.filter((movie) => {
        if (!movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
          return false;
        if (statusTab === "showing" && movie.comingSoon) return false;
        if (statusTab === "coming" && !movie.comingSoon) return false;
        if (expFilter !== "All" && !movie.experience.includes(expFilter))
          return false;
        if (genreFilter !== "All" && !movie.genres.includes(genreFilter))
          return false;
        return true;
      }),
    [searchTerm, statusTab, expFilter, genreFilter]
  );

  return (
    <div className={`page ${styles["movies-page"]}`}>
      {/* 0) Карусель трейлеров */}
      <TrailerCarousel />

      <div className={styles["movies-page__container"]}>
        {/* 1) Верхний ряд: заголовок + поиск + Filters */}
        <div className={styles["movies-page__controls"]}>
          <h1 className={styles["movies-page__title"]}>All Movies</h1>
          <div className={styles.controls__row}>
            <div className={styles["search-wrapper"]}>
              <FaSearch className={styles["search-icon"]} />
              <input
                type="text"
                placeholder="Search movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles["movies-page__search-input"]}
              />
            </div>
            <button className={styles["filters-button"]}>
              Filters <FaChevronDown className={styles["filters-icon"]} />
            </button>
          </div>
        </div>

        {/* 2) Второй ряд: статусные табы */}
        <div className={styles["movies-page__status-tabs-row"]}>
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles["status-tab"]} ${
                statusTab === tab.key ? styles["status-tab--active"] : ""
              }`}
              onClick={() => setStatusTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3) Размытый фон под фильтрами */}
        <div className={styles["movies-page__blur-container"]} />

        {/* 4) Третий ряд: фильтры Experience и Genre */}
        <div className={styles["movies-page__filters-row"]}>
          {/* Experience */}
          <div className={styles["filter-group"]}>
            <span className={styles["filter-label"]}>Experience</span>
            <div
              className={styles["filter-buttons"]}
              ref={expRef}
              onMouseDown={(e) => onDragStart(e, expRef)}
              onMouseUp={() => onDragEnd(expRef)}
              onMouseLeave={() => onDragEnd(expRef)}
              onMouseMove={(e) => onDragMove(e, expRef)}
            >
              {allExperiences.map((exp) => (
                <button
                  key={exp}
                  className={`${styles["filter-btn"]} ${
                    expFilter === exp ? styles.active : ""
                  }`}
                  onClick={() => setExpFilter(exp)}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Genre */}
          <div className={styles["filter-group"]}>
            <span className={styles["filter-label"]}>Genre</span>
            <div
              className={styles["filter-buttons"]}
              ref={genreRef}
              onMouseDown={(e) => onDragStart(e, genreRef)}
              onMouseUp={() => onDragEnd(genreRef)}
              onMouseLeave={() => onDragEnd(genreRef)}
              onMouseMove={(e) => onDragMove(e, genreRef)}
            >
              {allGenres.map((g) => (
                <button
                  key={g}
                  className={`${styles["filter-btn"]} ${
                    genreFilter === g ? styles.active : ""
                  }`}
                  onClick={() => setGenreFilter(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5) Сетка фильмов над фоном */}
        <div className={styles["movies-page__grid"]}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className={styles["movies-page__no-results"]}>
              No movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
