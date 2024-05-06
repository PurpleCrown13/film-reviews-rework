import "../css/Top5Settings.css";
import { useParams } from "react-router-dom";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Top5Settings = () => {
  const { login } = useParams();
  const history = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("token");
  const decoded = token ? jwtDecode(token) : null;
  const savedLogin = decoded ? decoded.login : null;
  const name = decoded.name;
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
  const isLoginMatch = login === savedLogin;
  const [movieOptions, setMovieOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState({
    name1: null,
    image1: null,
    name2: null,
    image2: null,
    name3: null,
    image3: null,
    name4: null,
    image4: null,
    name5: null,
    image5: null,
  });
  const sendSelectedDataToServer = async () => {
    try {
      const userLogin = decoded.login;
      const requestData = {
        login: userLogin,
        name1: selectedMovies.name1,
        image1: selectedMovies.image1,
        name2: selectedMovies.name2,
        image2: selectedMovies.image2,
        name3: selectedMovies.name3,
        image3: selectedMovies.image3,
        name4: selectedMovies.name4,
        image4: selectedMovies.image4,
        name5: selectedMovies.name5,
        image5: selectedMovies.image5,
      };

      await axios.post(
        "https://sharpleaf.biz.ua/movie.heaven.api/top5-add.php",
        requestData
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await axios.get(
          "https://sharpleaf.biz.ua/movie.heaven.api/api-profile.php"
        );
        const userLogin = decoded.login;
        const validMovies = moviesResponse.data.filter(
          (movie) => movie.name !== undefined && movie.login === userLogin
        );
        const movieNames = validMovies.map((movie) => movie.name);
        const movieImage = validMovies.map((movie) => movie.image);
        setMovieOptions(movieNames);
        setImageOptions(movieImage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const checkAllFieldsFilled = () => {
    for (let i = 1; i <= 5; i++) {
      const fieldName = `name${i}`;
      if (!selectedMovies[fieldName]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setAllFieldsFilled(checkAllFieldsFilled());
  }, [selectedMovies]);

  const isStepPrimary = (step) => {
    const fieldName = `name${step}`;
    return !!selectedMovies[fieldName];
  };


  return (
    <div className="top5-container">
      {isLoginMatch ? (
        <div>
          <Helmet>
            <title>Top 5 Settings</title>
          </Helmet>
          <div className="next-ui-autocomplete-container">
            <h1 className="top-title">Top 5 Settings for User {name}</h1>
            <Autocomplete
              isRequired
              label="Choose Your Favorite Work"
              variant="bordered"
              size={"lg"}
              className="next-ui-autocomplete"
              defaultItems={movieOptions.map((item, index) => ({
                value: item,
                label: item,
                key: index,
              }))}
              onSelectionChange={(selectedIndex) => {
                const selectedMovie = movieOptions[selectedIndex];
                const selectedImage = imageOptions[selectedIndex];
                setSelectedMovies({
                  ...selectedMovies,
                  name1: selectedMovie,
                  image1: selectedImage,
                });
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              isRequired
              label="Choose Your Favorite Work"
              variant="bordered"
              size={"lg"}
              className="next-ui-autocomplete"
              defaultItems={movieOptions.map((item, index) => ({
                value: item,
                label: item,
                key: index,
              }))}
              onSelectionChange={(selectedIndex) => {
                const selectedMovie = movieOptions[selectedIndex];
                const selectedImage = imageOptions[selectedIndex];
                setSelectedMovies({
                  ...selectedMovies,
                  name2: selectedMovie,
                  image2: selectedImage,
                });
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              isRequired
              label="Choose Your Favorite Work"
              variant="bordered"
              size={"lg"}
              className="next-ui-autocomplete"
              defaultItems={movieOptions.map((item, index) => ({
                value: item,
                label: item,
                key: index,
              }))}
              onSelectionChange={(selectedIndex) => {
                const selectedMovie = movieOptions[selectedIndex];
                const selectedImage = imageOptions[selectedIndex];
                setSelectedMovies({
                  ...selectedMovies,
                  name3: selectedMovie,
                  image3: selectedImage,
                });
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              isRequired
              label="Choose Your Favorite Work"
              variant="bordered"
              size={"lg"}
              className="next-ui-autocomplete"
              defaultItems={movieOptions.map((item, index) => ({
                value: item,
                label: item,
                key: index,
              }))}
              onSelectionChange={(selectedIndex) => {
                const selectedMovie = movieOptions[selectedIndex];
                const selectedImage = imageOptions[selectedIndex];
                setSelectedMovies({
                  ...selectedMovies,
                  name4: selectedMovie,
                  image4: selectedImage,
                });
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              isRequired
              label="Choose Your Favorite Work"
              variant="bordered"
              size={"lg"}
              className="next-ui-autocomplete"
              defaultItems={movieOptions.map((item, index) => ({
                value: item,
                label: item,
                key: index,
              }))}
              onSelectionChange={(selectedIndex) => {
                const selectedMovie = movieOptions[selectedIndex];
                const selectedImage = imageOptions[selectedIndex];
                setSelectedMovies({
                  ...selectedMovies,
                  name5: selectedMovie,
                  image5: selectedImage,
                });
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="daisy-steps">
            <ul className="steps">
              <li
                data-content="✓"
                className={`step ${isStepPrimary(1) ? "step-success" : ""}`}
              ></li>
              <li
                data-content="✓"
                className={`step ${isStepPrimary(2) ? "step-success" : ""}`}
              ></li>
              <li
                data-content="✓"
                className={`step ${isStepPrimary(3) ? "step-success" : ""}`}
              ></li>
              <li
                data-content="✓"
                className={`step ${isStepPrimary(4) ? "step-success" : ""}`}
              ></li>
              <li
                data-content="✓"
                className={`step ${isStepPrimary(5) ? "step-success" : ""}`}
              ></li>
            </ul>
          </div>
          <div className="next-ui-btn">
            <Button
              color="primary"
              size="lg"
              onClick={sendSelectedDataToServer}
              isDisabled={!allFieldsFilled}
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <div>These are not your settings.</div>
      )}
    </div>
  );
};

export default Top5Settings;
