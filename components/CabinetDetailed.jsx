import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../css/CabinetDetailed.css";
import { Tooltip, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CheckIcon } from "./CheckIcon.jsx";
import { CircularProgress } from "@nextui-org/react";
import QRCode from "react-qr-code";
const CabinetDetailed = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [animeCount, setAnimeCount] = useState(0);
  const [cartoonCount, setCartoonCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);
  const { username } = useParams();
  const [top5Data, setTop5Data] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [bestMovies, setBestdMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(40);
  const [visibleBestMoviesCount, setVisibleBestMoviesCount] = useState(16);
  const currentURL = `${window.location.protocol}//${window.location.host}`;

  const fetchData = async () => {
    try {
      const top5Response = await axios.get(
        `https://sharpleaf.biz.ua/film-reviews-api/api-top5.php?login=${username}`
      );
      setTop5Data(top5Response.data);

      const watchedMoviesResponse = await axios.get(
        `https://sharpleaf.biz.ua/film-reviews-api/api-profile.php?username=${username}`
      );
      const filteredWatchedMovies = watchedMoviesResponse.data.filter(
        (movie) => movie.login === username
      );
      const bestFilteredWatchedMovies = watchedMoviesResponse.data.filter(
        (movie) => movie.login === username && movie.masterpiece === "yes"
      );
      setWatchedMovies(filteredWatchedMovies);
      setBestdMovies(bestFilteredWatchedMovies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let animeCount = 0;
    let movieCount = 0;
    let cartoonCount = 0;
    let seriesCount = 0;
    watchedMovies.forEach((movie) => {
      if (movie.genre === "Anime") {
        animeCount++;
      } else if (movie.genre === "Movie") {
        movieCount++;
      } else if (movie.genre === "Cartoon") {
        cartoonCount++;
      } else if (movie.genre === "TV show") {
        seriesCount++;
      }
    });
    setAnimeCount(animeCount);
    setMovieCount(movieCount);
    setCartoonCount(cartoonCount);
    setSeriesCount(seriesCount);
  }, [watchedMovies]);

  const handleLoadMore = () => {
    setVisibleMoviesCount((prevCount) => prevCount + 40);
  };
  const handleLoadMoreBest = () => {
    setVisibleBestMoviesCount((prevCount) => prevCount + 18);
  };
  if (top5Data.length == 0 || top5Data[0].exist == "false") {
    return (
      <div>
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <div className="profile-name">
          <Chip
            color="danger"
            variant="dot"
            className="next-ui-title-chip hidden-chip"
            radius="md"
          >
            <p className="hidden-chip-text">Profile Hidden.</p>
          </Chip>
        </div>
      </div>
    );
  }

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
        <title>User Profile</title>
      </Helmet>
      <div className="divider-cd before:bg-[#ADBAC0] after:bg-[#ADBAC0] divider-name">
        <div className="profile-name">
          <Chip
            color="default"
            variant="flat"
            className="next-ui-title-chip"
            radius="md"
          >
            <div className="chip-cont">
              User Profile{" "}
              {top5Data.length > 0 ? (
                <>
                  <span style={{ marginRight: "10px", marginLeft: "10px" }}>
                    {top5Data.find((item) => item.login === username)?.name}
                  </span>
                </>
              ) : (
                username
              )}
            </div>
          </Chip>
        </div>
      </div>
      <div>
        <QRCode
          value={`${currentURL}/profile/${username}`}
          className="qr-codik"
        />
      </div>
      <div className="divider-cd before:bg-[#ADBAC0] after:bg-[#ADBAC0]">
        <div className="profile-name">
          <Chip variant="flat" className="next-ui-title-chip" radius="md">
            Top 5
          </Chip>
        </div>
      </div>
      <div>
        {top5Data
          .filter((item) => item.login === username)
          .map((item, index) => (
            <div key={index} className="top-5">
              <Tooltip
                classNames={{
                  base: ["before:bg-neutral-400 dark:before:bg-white"],
                }}
                content={item.name1}
                size="lg"
                placement="bottom"
              >
                <div className="top-5-image-container">
                  <Image src={item.image1} alt="" className="top-5-image" />
                </div>
              </Tooltip>
              <Tooltip
                classNames={{
                  base: ["before:bg-neutral-400 dark:before:bg-white"],
                }}
                content={item.name2}
                className="capitalize"
                size="lg"
                placement="bottom"
              >
                <div className="top-5-image-container">
                  <Image src={item.image2} alt="" className="top-5-image" />
                </div>
              </Tooltip>
              <Tooltip
                classNames={{
                  base: ["before:bg-neutral-400 dark:before:bg-white"],
                }}
                content={item.name3}
                className="capitalize"
                size="lg"
                placement="bottom"
              >
                <div className="top-5-image-container">
                  <Image src={item.image3} alt="" className="top-5-image" />
                </div>
              </Tooltip>
              <Tooltip
                classNames={{
                  base: ["before:bg-neutral-400 dark:before:bg-white"],
                }}
                content={item.name4}
                className="capitalize"
                size="lg"
                placement="bottom"
              >
                <div className="top-5-image-container">
                  <Image src={item.image4} alt="" className="top-5-image" />
                </div>
              </Tooltip>
              <Tooltip
                classNames={{
                  base: ["before:bg-neutral-400 dark:before:bg-white"],
                }}
                content={item.name5}
                className="capitalize"
                size="lg"
                placement="bottom"
              >
                <div className="top-5-image-container">
                  <Image src={item.image5} alt="" className="top-5-image" />
                </div>
              </Tooltip>
            </div>
          ))}
      </div>
      <div className="divider-cd before:bg-[#ADBAC0] after:bg-[#ADBAC0]">
        <div className="profile-name">
          <Chip variant="flat" className="next-ui-title-chip" radius="md">
            G.O.A.T.
          </Chip>
        </div>
      </div>
      <div className="philpmoteka">
        <div className="best-container">
          {bestMovies.slice(0, visibleBestMoviesCount).map((movie, index) => (
            <Tooltip key={index} color="warning" content={movie.name} size="lg">
              <Card
                isPressable
                onPress={() => {
                  setSelectedMovie(movie);
                  onOpen();
                }}
                className="card-best"
              >
                <img src={movie.image} alt={movie.name} className="cd-img" />
              </Card>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="load-more-button-container-best">
        {visibleBestMoviesCount < bestMovies.length && (
          <div>
            <Button
              onClick={handleLoadMoreBest}
              variant="solid"
              classNames={{
                base: ["before:bg-neutral-400 dark:before:bg-white"],
              }}
              className="load-more"
            >
              Show More
            </Button>
          </div>
        )}
      </div>
      <div className="divider-cd before:bg-[#ADBAC0] after:bg-[#ADBAC0]"></div>
      {watchedMovies != 0 && (
        <div className="daisy-stats ">
          <div className="stat place-items-center stat-grey">
            <CircularProgress
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              size="sm"
              value={animeCount}
              maxValue={watchedMovies.length}
              showValueLabel={true}
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
                indicator: "stroke-[#fff]",
                value: "text-xl font-semibold",
              }}
            />
            <div className="stat-title">Anime</div>
            <div className="stat-value">{animeCount}</div>
          </div>
          <div className="stat place-items-center stat-grey">
            <CircularProgress
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              size="sm"
              value={movieCount}
              maxValue={watchedMovies.length}
              showValueLabel={true}
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
                indicator: "stroke-[#fff]",
                value: "text-xl font-semibold",
              }}
            />
            <div className="stat-title">Movies</div>
            <div className="stat-value">{movieCount}</div>
          </div>
          <div className="stat place-items-center center-viewed">
            <div className="stat-title">Total Viewed</div>
            <div className="stat-value">{watchedMovies.length}</div>
          </div>
          <div className="stat place-items-center stat-grey">
            <CircularProgress
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              size="sm"
              value={seriesCount}
              maxValue={watchedMovies.length}
              showValueLabel={true}
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
                indicator: "stroke-[#fff]",
                value: "text-xl font-semibold",
              }}
            />
            <div className="stat-title">TV Shows</div>
            <div className="stat-value">{seriesCount}</div>
          </div>
          <div className="stat place-items-center stat-grey">
            <CircularProgress
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              size="sm"
              value={cartoonCount}
              maxValue={watchedMovies.length}
              showValueLabel={true}
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
                indicator: "stroke-[#fff]",
                value: "text-xl font-semibold",
              }}
            />
            <div className="stat-title">Cartoons</div>
            <div className="stat-value">{cartoonCount}</div>
          </div>
        </div>
      )}
      <div className="profile-name">
        <Chip variant="flat" className="next-ui-title-chip" radius="md">
          Recently Viewed Catalog
        </Chip>
      </div>
      <div className="philpmoteka">
        <div className="image-container">
          {watchedMovies.slice(0, visibleMoviesCount).map((movie, index) => (
            <Tooltip
              key={index}
              classNames={{
                base: ["before:bg-neutral-400 dark:before:bg-white"],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
              content={movie.name}
              size="lg"
            >
              <Card
                isPressable
                onPress={() => {
                  setSelectedMovie(movie);
                  onOpen();
                }}
                className="card-cd"
              >
                <img src={movie.image} alt={movie.name} className="cd-img" />
              </Card>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="load-more-button-container">
        {visibleMoviesCount < watchedMovies.length && (
          <div className="">
            <Button
              onClick={handleLoadMore}
              variant="solid"
              classNames={{
                base: ["before:bg-neutral-400 dark:before:bg-white"],
              }}
              className="load-more"
            >
              Show More
            </Button>
          </div>
        )}
      </div>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onClose}
        className="dark"
        size="lg"
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="modal-head">
              <div
                className="cd-img-modal-background-head"
                style={{ backgroundImage: `url(${selectedMovie?.image})` }}
              />
              {selectedMovie?.name}
            </ModalHeader>
            <ModalBody className="cd-img-modal-container">
              <div
                className="cd-img-modal-background"
                style={{ backgroundImage: `url(${selectedMovie?.image})` }}
              />

              <Image
                src={selectedMovie?.image}
                alt=""
                isBlurred
                className="cd-img-modal"
              />
              <div className="modal-bottom-rating-date">
                <div>Viewing Date</div>
                <div>{selectedMovie?.date}</div>
              </div>
              <div className="modal-bottom">
                <div className="modal-bottom-rating">
                  <div className="plot">
                    <Chip
                      color="warning"
                      variant="flat"
                      className="next-ui-chip"
                      classNames={{
                        base: "bg-gradient-to-r from-blue-900 to-blue-600",
                        content: "drop-shadow shadow-black text-white",
                      }}
                    >
                      Plot: {selectedMovie?.plot}
                    </Chip>
                  </div>
                  <div className="visual">
                    <Chip
                      color="warning"
                      variant="flat"
                      className="next-ui-chip"
                      classNames={{
                        base: "bg-gradient-to-r from-pink-900 to-pink-600",
                        content: "drop-shadow shadow-black text-white",
                      }}
                    >
                      Visuals: {selectedMovie?.visual}
                    </Chip>
                  </div>
                  <div className="originality">
                    <Chip
                      color="warning"
                      variant="flat"
                      className="next-ui-chip"
                      classNames={{
                        base: "bg-gradient-to-r from-orange-900 to-orange-600",
                        content: "drop-shadow shadow-black text-white",
                      }}
                    >
                      Originality: {selectedMovie?.originality}
                    </Chip>
                  </div>
                  <div className="atmosphere">
                    <Chip
                      color="warning"
                      variant="flat"
                      className="next-ui-chip"
                      classNames={{
                        base: "bg-gradient-to-r from-lime-900 to-lime-600",
                        content:
                          "drop-shadow shadow-black text-white font-semibold",
                      }}
                    >
                      Atmosphere: {selectedMovie?.atmosphere}
                    </Chip>
                  </div>
                </div>
              </div>
              <div className="modal-bottom-rating-result">
                {selectedMovie?.rating}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default CabinetDetailed;
