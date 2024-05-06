import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import { Pagination } from "@nextui-org/react";

import "../css/Best.css";

const Best = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 9;
  const pagesVisited = pageNumber * moviesPerPage;
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    if (!login) {
      history("/login");
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://sharpleaf.biz.ua/movie.heaven.api/api-all.php"
        );
        const filteredMovies = response.data.filter(
          (movie) => movie.masterpiece === "yes" && movie.login === login
        );
        setMovies(filteredMovies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const displayMovies = movies
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => (
      <div className="movie-card-best" key={movie.id}>
        <div className="movie-info">
          <img src={movie.image} alt="" className="movie-image" />
          <div className="movie-info-text">
            <div className="movie-title-best">{movie.name}</div>
            <div className="movie-view-date-best">{movie.date}</div>
            <div className="movie-comment-best">{movie.comment}</div>
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="details-best"
            >
              Watch details
            </Link>
          </div>
        </div>
      </div>
    ));

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Helmet>
        <title>G.O.A.T.</title>
      </Helmet>
      <div className="top-block">
        <h1>G.O.A.T.</h1>
      </div>
      <div className="page">
        {displayMovies}
        {movies.length > 0 && (
          <Pagination
            isCompact
            color="warning"
            variant={"flat"}
            showControls
            total={pageCount}
            initialPage={pageNumber + 1}
            onChange={(page) => changePage({ selected: page - 1 })}
            className="pagination"
            classNames={{
              cursor: "bg-[#ADBAC0]",
            }}
            size="sm"
          />
        )}
      </div>
    </motion.div>
  );
};

export default Best;
