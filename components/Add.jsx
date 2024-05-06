import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Add.css";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Tooltip } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { input } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";

const Add = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    season: "",
    image: "",
    year: "",
    date: new Date(), // Установим дату по умолчанию как текущую дату
    genre: "",
    franchise: "",
    comment: "",
    visual: 1,
    originality: 1,
    atmosphere: 1,
    plot: 1,
    rating: 1,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Преобразование даты в нужный формат
    const formattedDate = `${String(formData.date.getDate()).padStart(
      2,
      "0"
    )}/${String(formData.date.getMonth() + 1).padStart(2, "0")}/${String(
      formData.date.getFullYear()
    )}`;

    try {
      const response = await axios.post(
        "https://sharpleaf.biz.ua/movie.heaven.api/api-add-all.php",
        {
          ...formData,
          login: decoded.login,
          date: formattedDate,
          masterpiece: formData.masterpiece ? "yes" : "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // Handle successful response
      console.log(response.data);
      history("/");

      // Reset form
      setFormData({
        // Reset form fields to initial values
        name: "",
        season: "",
        image: "",
        year: "",
        date: new Date(),
        genre: "",
        plot: 0,
        visual: 0,
        originality: 0,
        atmosphere: 0,
        rating: 0,
        franchise: "",
        comment: "",
        masterpiece: "",
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleinputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      return {
        ...updatedFormData,
        rating: calculateRating(updatedFormData),
      };
    });
  };

  const calculateRating = (formData) => {
    const { visual, originality, atmosphere, plot } = formData;
    const total = visual + originality + atmosphere + plot;
    const average = total / 4;
    return Math.round(average);
  };

  const genres = [
    { value: "Фильм", label: "Movie" },
    { value: "Аниме", label: "Anime" },
    { value: "Мультфильм", label: "Cartoon" },
    { value: "Сериал", label: "TV show" },
  ];

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
        <title>Add</title>
      </Helmet>
      <div>
        <form onSubmit={handleFormSubmit} className="add-page">
          <div className="add-box">
            <input
              size="lg"
              type="text"
              placeholder="Title"
              name="name"
              onChange={handleinputChange}
              required
            />
            <input
              size="lg"
              type="text"
              placeholder="Season/Part"
              name="season"
              onChange={handleinputChange}
              required
            />
            <input
              size="lg"
              type="text"
              placeholder="Picture Link"
              name="image"
              onChange={handleinputChange}
              required
            />
            <input
              size="lg"
              type="text"
              placeholder="Release Year"
              name="year"
              onChange={handleinputChange}
              required
            />

            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="dd/MM/yyyy"
              name="date"
              placeholderText="Date"
              required
              className="datepicker"
            />

            {/* <Select
              value={formData.genre}
              onChange={handleinputChange}
              name="genre"
              isRequired
              className="dark ui-select"
              labelPlacement={"outside"}
              placeholder="Genre"
            >
              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </Select> */}
            <select
              value={formData.genre}
              onChange={handleinputChange}
              name="genre"
              required
              className="ui-select selecticks"
            >
              <option
                value=""
                disabled
                selected
                hidden
                className="placeholder-for-select"
              >
                Select Genre
              </option>
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>
            <input
              size="lg"
              type="text"
              placeholder="Franchise"
              name="franchise"
              onChange={handleinputChange}
            />
            <label className="checkbox-container">
              <Checkbox
                type="checkbox"
                name="masterpiece"
                checked={formData.masterpiece}
                onChange={() =>
                  setFormData({
                    ...formData,
                    masterpiece: !formData.masterpiece,
                  })
                }
                color="warning"
                icon={
                  <svg
                    fill="#000000"
                    width="64px"
                    height="64px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>star-round</title>{" "}
                      <path d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28 6.208q0 3.264-1.28 6.208t-3.392 5.12-5.12 3.424-6.208 1.248-6.208-1.248-5.12-3.424-3.392-5.12-1.28-6.208zM4 16q0 3.264 1.6 6.048t4.384 4.352 6.016 1.6 6.016-1.6 4.384-4.352 1.6-6.048-1.6-6.016-4.384-4.352-6.016-1.632-6.016 1.632-4.384 4.352-1.6 6.016zM6.496 12.928l6.56-0.96 2.944-5.952 2.944 5.952 6.56 0.96-4.768 4.64 1.152 6.528-5.888-3.072-5.888 3.072 1.152-6.528z"></path>{" "}
                    </g>
                  </svg>
                }
              >
                Add to Masterpiece
              </Checkbox>
            </label>
             <button className="add-button" type="submit">
            Add
          </button>
          </div>
          <div className="add-box-2">
            <Slider
              size="lg"
              label="Plot"
              step={1}
              maxValue={10}
              minValue={1}
              defaultValue={1}
              className="max-w-md next-ui-slider"
              // showSteps
              disableThumbScale
              getValue={(evaluation) => `${evaluation} of 10`}
              onChange={(value) => handleSliderChange("plot", value)}
              classNames={{
                base: "max-w-md gap-3",
                track: "border-s-blue-900 bg-[#141414]",
                filler:
                  "bg-gradient-to-r from-blue-900  via-blue-600  to-blue-300",
                thumb: ["bg-blue-300"],
              }}
            />
            <Slider
              size="lg"
              label="Visual"
              step={1}
              maxValue={10}
              minValue={1}
              defaultValue={1}
              className="max-w-md next-ui-slider"
              // showSteps
              disableThumbScale
              getValue={(evaluation) => `${evaluation} of 10`}
              onChange={(value) => handleSliderChange("visual", value)}
              classNames={{
                base: "max-w-md gap-3",
                track: "border-s-pink-900 bg-[#141414]",
                filler:
                  "bg-gradient-to-r from-pink-900  via-pink-600  to-pink-300",
                thumb: ["bg-pink-300"],
              }}
            />
            <Slider
              size="lg"
              label="Originality"
              step={1}
              maxValue={10}
              minValue={1}
              defaultValue={1}
              className="max-w-md next-ui-slider"
              // showSteps
              disableThumbScale
              getValue={(evaluation) => `${evaluation} of 10`}
              onChange={(value) => handleSliderChange("originality", value)}
              classNames={{
                base: "max-w-md gap-3",
                track: "border-s-orange-900 bg-[#141414]",
                filler:
                  "bg-gradient-to-r from-orange-900  via-orange-600  to-orange-300",
                thumb: ["bg-orange-300"],
              }}
            />
            <Slider
              size="lg"
              label="Atmosphere"
              step={1}
              maxValue={10}
              minValue={1}
              defaultValue={1}
              className="max-w-md next-ui-slider"
              // showSteps
              disableThumbScale
              getValue={(evaluation) => `${evaluation} of 10`}
              onChange={(value) => handleSliderChange("atmosphere", value)}
              classNames={{
                base: "max-w-md gap-3",
                track: "border-s-lime-900 bg-[#141414]",
                filler:
                  "bg-gradient-to-r from-lime-900  via-lime-600  to-lime-300",
                thumb: ["bg-lime-300"],
              }}
            />
            <div className="result-rating">{formData.rating}</div>
            <textarea
              cols="90"
              placeholder="Comment..."
              onChange={handleinputChange}
              name="comment"
            ></textarea>
          </div>
         
        </form>
      </div>
    </motion.div>
  );
};

export default Add;
