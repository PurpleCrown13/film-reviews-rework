import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Edit.css";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";

const Edit = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isMasterpiece, setIsMasterpiece] = useState(
    movie?.masterpiece === "yes"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("token");
  const decoded = token ? jwtDecode(token) : null;
  const login = decoded ? decoded.login : null;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://sharpleaf.biz.ua/movie.heaven.api/api-all.php?id=${id}`
        );
        const foundMovie = response.data.find((movie) => movie.id === id);
        if (foundMovie) {
          setMovie(foundMovie);

          const login = foundMovie.login;
          if (login === decoded.login) {
            setUserLogin(login);
          } else {
            setError(true);
          }
          setIsMasterpiece(foundMovie.masterpiece === "yes");
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
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedMovie = {
        ...movie,
        masterpiece: isMasterpiece ? "yes" : "",
      };
      await axios.post(
        `https://sharpleaf.biz.ua/movie.heaven.api/api-update.php?id=${id}`,
        updatedMovie
      );
      history(`/movies/${id}`);
    } catch (error) {}
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Не удалось загрузить фильм для редактирования.</div>;
  }

  if (!movie) {
    return <div>Фильм не найден.</div>;
  }

  if (userLogin !== decoded.login) {
    return <div>У вас нет доступа к этой странице.</div>;
  }

  return (
    <div className="edit-container">
      <Helmet>
        <title>Edit {movie.name}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <br />
          <textarea
            type="text"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Season / Part:
          <br />
          <textarea
            type="text"
            value={movie.season}
            onChange={(e) => setMovie({ ...movie, season: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Picture Link:
          <br />
          <textarea
            type="text"
            value={movie.image}
            onChange={(e) => setMovie({ ...movie, image: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Year of release:
          <br />
          <textarea
            type="number"
            value={movie.year}
            onChange={(e) => setMovie({ ...movie, year: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          View date:
          <br />
          <textarea
            type="text"
            value={movie.date}
            onChange={(e) => setMovie({ ...movie, date: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Genre:
          <br />
          <textarea
            type="text"
            value={movie.genre}
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Plot:
          <br />
          <textarea
            type="number"
            value={movie.plot}
            onChange={(e) => setMovie({ ...movie, plot: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Visual:
          <br />
          <textarea
            type="number"
            value={movie.visual}
            onChange={(e) => setMovie({ ...movie, visual: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Originality:
          <br />
          <textarea
            type="number"
            value={movie.originality}
            onChange={(e) =>
              setMovie({ ...movie, originality: e.target.value })
            }
          />
        </label>
        <br />
        <br />
        <label>
          Atmosphere:
          <br />
          <textarea
            type="number"
            value={movie.atmosphere}
            onChange={(e) => setMovie({ ...movie, atmosphere: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Final estimate:
          <br />
          <textarea
            type="number"
            value={movie.rating}
            onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Review:
          <br />
          <textarea
            type="text"
            value={movie.comment}
            onChange={(e) => setMovie({ ...movie, comment: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Franchise:
          <br />
          <textarea
            type="text"
            value={movie.franchise}
            onChange={(e) => setMovie({ ...movie, franchise: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label className="edit-checkbox-container">
          <input
            type="checkbox"
            checked={isMasterpiece}
            onChange={(e) => setIsMasterpiece(e.target.checked)}
          />
          Add to Masterpieces
        </label>
        <br />
        <br />
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default Edit;
