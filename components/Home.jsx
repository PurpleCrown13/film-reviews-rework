import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import BrilliantButton from "../components/BrilliantButton";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import { Checkbox } from "@nextui-org/react";
import { Helmet } from "react-helmet";

const Home = () => {
  const history = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("token");
  const decoded = token ? jwtDecode(token) : null;
  const login = decoded ? decoded.login : null;
  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      history("/login");
    } else {
      const decoded = jwtDecode(token);
      const login = decoded.login;
      window.scrollTo(0, 0);
    }
  }, []);

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState(null);
  const [filterGenres, setFilterGenres] = useState([]);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [filterYear, setFilterYear] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://sharpleaf.biz.ua/movie.heaven.api/api-all.php"
        );
        // Фильтрация данных
        const filteredMovies = response.data.filter(
          (movie) => movie.login === login
        );
        setMovies(filteredMovies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const getBackgroundColor = (rating) => {
    if (rating == 10) {
      return "#747DAF";
    } else if (rating >= 8 && rating <= 9) {
      return "#009BFF";
    } else if (rating >= 5 && rating <= 7) {
      return "#0BB652";
    } else if (rating >= 3 && rating <= 4) {
      return "#EBF600";
    } else if (rating >= 2 && rating <= 3) {
      return "#F67D00";
    } else if (rating == 1) {
      return "#FF341A";
    } else {
      return "#C1CAD1";
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilterGenres(selectedValues);
  };

  const handleFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilterRating(selectedValues);
  };

  const handleYearFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilterYear(selectedValues);
  };

  const handleFilterBoxToggle = () => {
    setIsFilterBoxOpen(!isFilterBoxOpen);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const yearOptions = [
    { value: "1920-1929", label: "1920-1929" },
    { value: "1930-1939", label: "1930-1939" },
    { value: "1940-1949", label: "1940-1949" },
    { value: "1950-1959", label: "1950-1959" },
    { value: "1960-1969", label: "1960-1969" },
    { value: "1970-1979", label: "1970-1979" },
    { value: "1980-1989", label: "1980-1989" },
    { value: "1990-1999", label: "1990-1999" },
    { value: "2000-2009", label: "2000-2009" },
    { value: "2010-2019", label: "2010-2019" },
    { value: "2020-2029", label: "2020-2029" },
  ];

  const ratingOptions = [
    { value: "10", label: "10" },
    { value: "9", label: "9" },
    { value: "8", label: "8" },
    { value: "7", label: "7" },
    { value: "6", label: "6" },
    { value: "5", label: "5" },
    { value: "4", label: "4" },
    { value: "3", label: "3" },
    { value: "2", label: "2" },
    { value: "1", label: "1" },
  ];

  const genreOptions = [
    { value: "Мультфильм", label: "Cartoon" },
    { value: "Фильм", label: "Movie" },
    { value: "Аниме", label: "Anime" },
    { value: "Сериал", label: "TV show" },
  ];

  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRating === null ||
        filterRating.length === 0 ||
        filterRating.includes(movie.rating.toString())) &&
      (filterYear === null ||
        filterYear.length === 0 ||
        filterYear.some((yearRange) => {
          const [startYear, endYear] = yearRange.split("-");
          const movieYear = parseInt(movie.year);
          return (
            movieYear >= parseInt(startYear) && movieYear <= parseInt(endYear)
          );
        })) &&
      (filterGenres.length === 0 ||
        filterGenres.some((genre) => movie.genre.includes(genre)))
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#0A0A09",
      border: "none",
      borderRadius: "10px",
      // boxShadow: state.isFocused ? "0 0 0 2px #888" : "none",
      padding: "5px",
      width: "40vw",
      textAlign: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "20px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#FFCC00",
      color: "#000",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "16px",
      padding: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      textAlign: "center",
      "&:hover": {
        color: "black", // Измените цвет текста при наведении здесь
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "#1A1A1A",
      borderRadius: "10px",
      marginTop: "4px",
      fontSize: "20px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "4px",
      fontSize: "20px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#fff", // Цвет плейсхолдера
      fontFamily: "GT Eesti Pro Display",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff", // Цвет текста в Select
    }),
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);
  const [isCompactMode, setIsCompactMode] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {currentPage === 0 && (
        <BrilliantButton buttonText="Sort" onClick={handleFilterBoxToggle} />
      )}
      <AnimatePresence>
        {isFilterBoxOpen && (
          <motion.div
            className={`filter-box ${isFilterBoxOpen ? "open" : ""}`}
            initial={{ opacity: 0, y: -200, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -200, scale: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="sidebar">
              {" "}
              {/* Добавляем слева панель */}
              <h1 className="page-title">Sort by rating:</h1>
              <label htmlFor="rating-filter"></label>
              <div className="custom-select-container" style={containerStyles}>
                <Select
                  id="rating-filter"
                  options={ratingOptions}
                  isMulti
                  onChange={handleFilterChange}
                  styles={customStyles}
                  placeholder=""
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#e6b800",
                      primary: "black",
                    },
                  })}
                />
              </div>
            </div>
            <div className="sidebar">
              <h1 className="page-title">Sort by year:</h1>
              <label htmlFor="year-filter"></label>
              <div className="custom-select-container" style={containerStyles}>
                <Select
                  id="year-filter"
                  options={yearOptions}
                  isMulti
                  onChange={handleYearFilterChange}
                  styles={customStyles}
                  placeholder=""
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#e6b800",
                      primary: "black",
                    },
                  })}
                />
              </div>
            </div>
            <div className="sidebar">
              <h1 className="page-title">Sort by genre:</h1>
              <label htmlFor="genre-filter"></label>
              <div className="custom-select-container" style={containerStyles}>
                <Select
                  id="genre-filter"
                  options={genreOptions}
                  isMulti
                  onChange={handleGenreFilterChange}
                  styles={customStyles}
                  placeholder=""
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#e6b800",
                      primary: "black",
                    },
                  })}
                />
              </div>
            </div>
            <div className="sidebar">
              {" "}
              {/* Добавляем панель поиска */}
              <h1 className="page-title">Search:</h1>
              <div className="search-bar">
                <motion.input
                  type="text"
                  placeholder=""
                  value={searchTerm}
                  onChange={handleSearchChange}
                  // whileFocus={{ width: "100%" }}
                  // transition={{ duration: 0.3, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="wrapper">
          {filteredMovies.length > itemsPerPage && (
            <Pagination
              isCompact
              color="success"
              variant="flat"
              showControls
              total={Math.ceil(filteredMovies.length / itemsPerPage)}
              initialPage={currentPage + 1}
              onChange={(page) => handlePageChange(page - 1)}
              className="pagination"
              classNames={{
                cursor: "bg-[#ADBAC0]",
              }}
              size="sm"
            />
          )}
          <div className="compact_checkbox">
            <Checkbox
              color="success"
              radius="full"
              onChange={() => setIsCompactMode(!isCompactMode)}
            >
              <p className="compact_text">Compact Mode</p>
            </Checkbox>
          </div>

          <div className="movie-container">
            {currentMovies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <motion.div
                  className={`movie-card ${
                    isCompactMode ? "compact-mode" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={movie.image} alt="" />
                  <h2 className="movie-name">{movie.name}</h2>
                  <div
                    className={`movie-rate text-blue-400 ${
                      isCompactMode ? "compact-mode-rate" : ""
                    }`}
                    style={{
                      backgroundColor: getBackgroundColor(movie.rating),
                    }}
                  >
                    {movie.rating}
                  </div>
                  {movie.masterpiece === "yes" && (
                    // <div className="masterpiece">
                    //   <svg
                    //     fill="#000000"
                    //     width="64px"
                    //     height="64px"
                    //     viewBox="0 0 32 32"
                    //     version="1.1"
                    //     xmlns="https://www.w3.org/2000/svg"
                    //   >
                    //     <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    //     <g
                    //       id="SVGRepo_tracerCarrier"
                    //       stroke-linecap="round"
                    //       stroke-linejoin="round"
                    //     ></g>
                    //     <g id="SVGRepo_iconCarrier">
                    //       {" "}
                    //       <title>star-round</title>{" "}
                    //       <path d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28 6.208q0 3.264-1.28 6.208t-3.392 5.12-5.12 3.424-6.208 1.248-6.208-1.248-5.12-3.424-3.392-5.12-1.28-6.208zM4 16q0 3.264 1.6 6.048t4.384 4.352 6.016 1.6 6.016-1.6 4.384-4.352 1.6-6.048-1.6-6.016-4.384-4.352-6.016-1.632-6.016 1.632-4.384 4.352-1.6 6.016zM6.496 12.928l6.56-0.96 2.944-5.952 2.944 5.952 6.56 0.96-4.768 4.64 1.152 6.528-5.888-3.072-5.888 3.072 1.152-6.528z"></path>{" "}
                    //     </g>
                    //   </svg>
                    // </div>
                    <div class="ribbon">
                      <span>G.O.A.T.</span>
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {!isLoading && filteredMovies.length === 0 && (
            <div className="Allert">Not found.ಥ_ಥ</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
