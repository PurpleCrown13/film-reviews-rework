import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Countdown from "react-countdown";
import "../css/CountdownPage.css";
import { Helmet } from "react-helmet";

const CountdownPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <title>Countdown</title>
      </Helmet>
      <div className="countdown-page-container">
        <div className="countdown-box">
          <img src="https://preview.redd.it/you-guys-asked-for-it-on-set-deadpool-3-sleeveless-v0-m16p88eo9cbb1.jpg?auto=webp&s=639ba5bff1d315e482bc917ba419096dd48e9566" alt="" />
          <div className="countdown-title-box">
            <div className="countdown-title">Deadpool 3</div>
            <Countdown date="2024-07-01T00:00:00" className="countdown" />
            <div className="countdown-data">July 1, 2024</div>
          </div>
        </div>
        <div className="countdown-box">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/joker-joaquin-phoenix-1567084475.jpg?crop=0.504xw:0.756xh;0.496xw,0.114xh&resize=640:*"
            alt=""
          />
          <div className="countdown-title-box">
            <div className="countdown-title">Joker: Folie à Deux</div>
            <Countdown date="2024-10-04T00:00:00" className="countdown" />
            <div className="countdown-data">October 4, 2024</div>
          </div>
        </div>
        <div className="countdown-box">
          <img
            src="https://media3.giphy.com/media/8ciNNLBwEfNZrPm9l8/giphy.gif"
            alt=""
          />
          <div className="countdown-title-box">
            <div className="countdown-title">Terrifier 3</div>
            <Countdown date="2024-10-25T00:00:00" className="countdown" />
            <div className="countdown-data">October 25, 2024</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownPage;
