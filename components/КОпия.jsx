import "../css/Home.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <div className="top-block">
        <div className="filter-box">
          <div class="search-container">
            <form action="#" method="get" className="search-box">
              <input
                type="text"
                placeholder="Search..."
                name="search"
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </form>
          </div>
          <div className="filter"></div>
          <div>Genre</div>
          <select class="custom-select">
            <option value=""></option>
            <option value="Movie">Movie</option>
            <option value="Anime">Anime</option>
            <option value="Serial">Serial</option>
            <option value="Cartoon">Cartoon</option>
          </select>
          <div>Rating</div>
          <select class="custom-select">
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <div>Year</div>
          <select class="custom-select">
            <option value=""></option>
            <option value="1920-1929">1920-1929</option>
            <option value="1930-1939">1930-1939</option>
            <option value="1940-1949">1940-1949</option>
            <option value="1950-1959">1950-1959</option>
            <option value="1960-1969">1960-1969</option>
            <option value="1970-1979">1970-1979</option>
            <option value="1980-1989">1980-1989</option>
            <option value="1990-1999">1990-1999</option>
            <option value="2000-2009">2000-2009</option>
            <option value="2010-2019">2010-2019</option>
            <option value="2020-2029">2020-2029</option>
          </select>
        </div>
      </div>
      <div className="page">
        <div className="movie-card">
          <div className="movie-card-top-box">
            <div className="movie-favourite">
              <img src="fav.svg" alt="" />
            </div>
            <div className="movie-view-date">05 May 2024</div>
            <div className="movie-rating">3</div>
          </div>
          <div className="movie-info">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzc4YzBiZTItMDVhYi00MzhkLTllNmItZTgyYTFkY2E2MGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"
              alt=""
              className="movie-image"
            />
            <div className="movie-info-text">
              <div className="movie-title">Candyman</div>
              <div className="movie-comment">Комментарий.</div>
              <button className="details">Watch details</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
