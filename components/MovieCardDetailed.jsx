import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../css/MovieCardDetailed.css";
import { motion } from "framer-motion";
import axios from "axios";
import { Image } from "antd";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import { FastAverageColor } from "fast-average-color";

const MovieCardDetailed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [franchiseData, setFranchiseData] = useState([]);
  const [blurComment, setBlurComment] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const history = useNavigate();
  const fac = new FastAverageColor();

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
      location.reload();
    } else {
      const decoded = jwtDecode(token);
      const login = decoded.login;
      window.scrollTo(0, 0);
    }
  }, []);

  const RatingIcons = ({ rating }) => {
    const icons = [];
    for (let i = 0; i < rating; i++) {
      icons.push(
        <FavoriteIcon key={i} fontSize="inherit" style={{ color: "#ff6d75" }} />
      );
    }
    for (let i = rating; i < 10; i++) {
      icons.push(
        <FavoriteIcon key={i} fontSize="inherit" style={{ color: "#f9f9f9" }} />
      );
    }
    return icons;
  };
  const toggleBlur = () => {
    setBlurComment(!blurComment);
    setShowButton(false);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          "https://sharpleaf.biz.ua/film-reviews-api/api-all.php"
        );
        const foundMovie = response.data.find((movie) => movie.id === id);
        if (foundMovie) {
          if (foundMovie.login !== login) {
            setError(true);
          } else {
            setMovie(foundMovie);
            const franchiseResponse = await axios.get(
              "https://sharpleaf.biz.ua/film-reviews-api/api-all.php"
            );
            const filteredFranchiseData = franchiseResponse.data.filter(
              (franchise) => franchise.franchise === foundMovie.franchise
            );
            setFranchiseData(filteredFranchiseData);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, login]);
  const [averageColor, setAverageColor] = useState(null);

  useEffect(() => {
    if (movie && movie.image) {
      const proxyUrl =
        "https://sharpleaf.biz.ua/movie.heaven.api/proxy/proxy.php?url=" +
        encodeURIComponent(movie.image);
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.src = proxyUrl;
      img.onload = () => {
        fac
          .getColorAsync(img)
          .then((color) => {
            setAverageColor(color.rgba);
            console.log("Average color:", color.rgba);
          })
          .catch((e) => {
            console.log("Error while getting color:", e);
          });
      };
    }
  }, [movie]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>У вас нет доступа к этой странице.</div>;
  }

  if (!movie) {
    return <div>Такого фильма не существует.</div>;
  }

  const getBackgroundColor = (rating) => {
    if (rating == 10) {
      return "#C896D9";
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

  const handleDelete = async () => {
    try {
      await axios({
        method: "delete",
        url: `https://sharpleaf.biz.ua/film-reviews-api/api-delete-detailed.php?id=${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      history("/");
    } catch (error) {
      console.error("Ошибка при удалении данных:", error);
    }
  };

  const handleEdit = () => {
    history(`/movies/${id}/edit`);
  };

  return (
    <motion.div
      className="det-movie-wrapper"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Helmet>
        <title>{movie.name}</title>
      </Helmet>
      <div className="MCD-containe" />
      <div className="movie-box">
        <div className="top-box">
          <div className="MCD-container">
            <div className="left-block">
              {/* <img src={movie.image} alt="" className="poster" /> */}
              <Image src={movie.image} className="poster" />
              <div className="divider"></div>
              <div className="stat">
                <div>Plot</div>
                <div>{movie.plot}</div>
              </div>
              <div className="stat">
                <div>Atmosphere</div>
                <div>{movie.atmosphere}</div>
              </div>
              <div className="stat">
                <div>Visual</div>
                <div>{movie.visual}</div>
              </div>
              <div className="stat">
                <div>Originality</div>
                <div>{movie.originality}</div>
              </div>
              <div className="divider"></div>
              <div className="stat">
                <div>Type</div>
                <div>{movie.genre}</div>
              </div>
              <div className="stat">
                <div>Season / Part</div>
                <div>{movie.season}</div>
              </div>
              <div className="stat">
                <div>Year of release</div>
                <div>{movie.year}</div>
              </div>
              <div className="stat">
                <div>View date</div>
                <div>{movie.date}</div>
              </div>
              <div className="divider"></div>
              <div className="rate">
                <RatingIcons rating={parseInt(movie.rating)} />
              </div>
            </div>
            <div className="right-block">
              <div
                className="title"
                style={{
                  background: averageColor
                    ? `linear-gradient(to bottom, ${averageColor.replace(
                        "1)",
                        "0.9)"
                      )}, ${averageColor.replace("1)", "0.25)")})
                    `
                    : "transparent",
                }}
              >
                {movie.name}
              </div>

              <div className="comment-container">
                <div className="comment">
                  <p className={`comment-text ${blurComment ? "blurred" : ""}`}>
                    {movie.comment}
                  </p>
                </div>
                {showButton && (
                  <button className="view-btn-centered" onClick={toggleBlur}>
                    <svg
                      width="24px"
                      height="24px"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 12s-3 6-10 6-10-6-10-6 3-6 10-6 10 6 10 6Z"></path>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                    </svg>
                  </button>
                )}
              </div>
              {movie.franchise && movie.login === login && (
                <div className="franchise-box">
                  <div className="franchise-title">
                    {movie.franchise + " (" + franchiseData.length + " "}
                    parts)
                  </div>
                  <div className="franchise-columns">
                    <div className="franchise-column-left">
                      <div className="franchise-season">Part </div>
                      <div className="franchise-name">Name</div>
                    </div>
                    <div className="franchise-column-right">
                      <div className="franchise-year">Year </div>
                      <div className="franchise-rating">Rating </div>
                    </div>
                  </div>
                  {franchiseData
                    .filter((franchise) => franchise.login === login)
                    .sort((a, b) => b.year - a.year)
                    .map((franchise) => (
                      <div className="franchise-content" key={franchise.id}>
                        <div className="franchise-content-left">
                          <div className="franchise-content-season">
                            {franchise.season}
                          </div>
                          <Link
                            to={`/movies/${franchise.id}`}
                            className={`franchise-content-name ${
                              franchise.name === movie.name ? "highlighted" : ""
                            }`}
                          >
                            {franchise.name}
                          </Link>
                        </div>
                        <div className="franchise-content-right">
                          <div className="franchise-content-year">
                            {franchise.year}
                          </div>
                          <div
                            className="franchise-content-rating"
                            style={{
                              backgroundColor: getBackgroundColor(
                                franchise.rating
                              ),
                            }}
                          >
                            {franchise.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <div className="btn-container">
                <button className="edit-btn" onClick={handleEdit}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    xmlns="https://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
                      ></path>
                      <path
                        fill="#000000"
                        d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    xmlns="https://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCardDetailed;
