import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../css/Cabinet.css";
import { useNavigate } from "react-router-dom";
import { message, Popconfirm } from "antd";
import { Helmet } from "react-helmet";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import React from "react";
import Marquee from "react-fast-marquee";
import { Alert } from "antd";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { Progress } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import { AreaChart } from "@tremor/react";
import { DonutChart } from "@tremor/react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

const Cabinet = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [animeCount, setAnimeCount] = useState(0);
  const [cartoonCount, setCartoonCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [averageMovieRating, setAverageMovieRating] = useState(0);
  const [averageAnimeRating, setAverageAnimeRating] = useState(0);
  const [averageCartoonRating, setAverageCartoonRating] = useState(0);
  const [averageSeriesRating, setAverageSeriesRating] = useState(0);
  const [averageTotalRating, setAverageTotalRating] = useState(0);
  const [year2023Data, setYear2023Data] = useState(null);
  const [year2024Data, setYear2024Data] = useState(null);
  const history = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const token = getCookie("token");
  const decoded = token ? jwtDecode(token) : null;
  const login = decoded ? decoded.login : null;
  const name = decoded ? decoded.name : null;

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
  const [messageApi, contextHolder] = message.useMessage();
  const confirm = (e) => {
    console.log(e);
    handleDeleteLogin();
  };
  const cancel = (e) => {
    console.log(e);
    toast.error("Logout canceled", {
      style: {
        borderRadius: "50px",
        background: "#121212",
        color: "#fff",
      },
    });
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of views by month for 2023",
      },
    },
  };
  const options2024 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of views by month for 2024",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentURL = `${window.location.protocol}//${window.location.host}`;
  const [exist, setExist] = useState(false);
  const [isSelected, setIsSelected] = useState(exist);
  const [data, setData] = useState([]);
  const [data2024, setData2024] = useState([]);
  const chartdata = [
    {
      date: "Jan ",
      2023: data[0],
      2024: data2024[0],
    },
    {
      date: "Feb ",
      2023: data[1],
      2024: data2024[1],
    },
    {
      date: "Mar ",
      2023: data[2],
      2024: data2024[2],
    },
    {
      date: "Apr ",
      2023: data[3],
      2024: data2024[3],
    },
    {
      date: "May ",
      2023: data[4],
      2024: data2024[4],
    },
    {
      date: "Jun ",
      2023: data[5],
      2024: data2024[5],
    },
    {
      date: "Jul ",
      2023: data[6],
      2024: data2024[6],
    },
    {
      date: "Aug ",
      2023: data[7],
      2024: data2024[7],
    },
    {
      date: "Sep ",
      2023: data[8],
      2024: data2024[8],
    },
    {
      date: "Oct ",
      2023: data[9],
      2024: data2024[9],
    },
    {
      date: "Nov ",
      2023: data[10],
      2024: data2024[10],
    },
    {
      date: "Dec ",
      2023: data[11],
      2024: data2024[11],
    },
  ];
  const [datahero, setDataHero] = useState([]);
  const [datahero23, setDataHero23] = useState([]);
  const [datahero24, setDataHero24] = useState([]);

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}` + " 👁️";

  const valueFormatter = function (number) {
    return new Intl.NumberFormat("us").format(number).toString() + " 👁️";
  };

  const dataLine = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Watched",
        data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
      },
    ],
  };
  const dataLine2024 = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Watched",
        data: data2024,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
      },
    ],
  };
  const calculateData = (apiData) => {
    const monthCounts = Array(12).fill(0);
    const login = decoded.login;
    const dateRegex = /(\d{1,2}[./]\d{1,2}[./]\d{2,4})/;
    apiData.forEach((item) => {
      const date = item.date;
      if (date) {
        const matches = date.match(dateRegex);
        if (matches) {
          const matchedDate = matches[1];
          if (matchedDate.endsWith("23") || matchedDate.endsWith("2023")) {
            if (item.login === login) {
              const monthIndex = parseInt(matchedDate.split(/[./]/)[1]) - 1;
              if (!isNaN(monthIndex)) {
                monthCounts[monthIndex]++;
              }
            }
          }
        }
      }
    });
    return monthCounts;
  };
  const calculateData2024 = (apiData24) => {
    const monthCounts = Array(12).fill(0);
    const login = decoded.login;
    const dateRegex = /(\d{1,2}[./]\d{1,2}[./]\d{2,4})/;
    apiData24.forEach((item) => {
      const date = item.date;
      if (date) {
        const matches = date.match(dateRegex);
        if (matches) {
          const matchedDate = matches[1];
          if (matchedDate.includes("2024")) {
            if (item.login === login) {
              const monthIndex = parseInt(matchedDate.split(/[./]/)[1]) - 1;
              if (!isNaN(monthIndex)) {
                monthCounts[monthIndex]++;
              }
            }
          }
        }
      }
    });
    return monthCounts;
  };
  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (acc, cur) => acc + cur,
              0
            );
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(2) + "%" : "0.00%";
            return ` ${value} evaluations (${percentage})`;
          },
        },
      },
    },
  };
  const [allRatingsData, setAllRatingsData] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 52, 26, 0.5)",
          "rgba(246, 125, 0, 0.5)",
          "rgba(235, 246, 0, 0.5)",
          "rgba(235, 246, 0, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(0, 155, 255, 0.5)",
          "rgba(0, 155, 255, 0.5)",
          "rgba(200, 150, 217, 0.5)",
        ],
        borderColor: [
          "rgba(255, 52, 26, 1)",
          "rgba(246, 125, 0, 1)",
          "rgba(235, 246, 0, 1)",
          "rgba(235, 246, 0, 1)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 1)",
          "rgba(11, 182, 82, 1)",
          "rgba(0, 155, 255, 1)",
          "rgba(0, 155, 255, 1)",
          "rgba(200, 150, 217, 1)",
        ],
        borderWidth: 2,
      },
    ],
  });
  const [allRatingsData23, setAllRatingsData23] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 52, 26, 0.5)",
          "rgba(246, 125, 0, 0.5)",
          "rgba(235, 246, 0, 0.5)",
          "rgba(235, 246, 0, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(0, 155, 255, 0.5)",
          "rgba(0, 155, 255, 0.5)",
          "rgba(200, 150, 217, 0.5)",
        ],
        borderColor: [
          "rgba(255, 52, 26, 1)",
          "rgba(246, 125, 0, 1)",
          "rgba(235, 246, 0, 1)",
          "rgba(235, 246, 0, 1)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 1)",
          "rgba(11, 182, 82, 1)",
          "rgba(0, 155, 255, 1)",
          "rgba(0, 155, 255, 1)",
          "rgba(200, 150, 217, 1)",
        ],
        borderWidth: 2,
      },
    ],
  });
  const [allRatingsData24, setAllRatingsData24] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 52, 26, 0.5)",
          "rgba(246, 125, 0, 0.5)",
          "rgba(235, 246, 0, 0.5)",
          "rgba(235, 246, 0, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(0, 155, 255, 0.5)",
          "rgba(0, 155, 255, 0.5)",
          "rgba(200, 150, 217, 0.5)",
        ],
        borderColor: [
          "rgba(255, 52, 26, 1)",
          "rgba(246, 125, 0, 1)",
          "rgba(235, 246, 0, 1)",
          "rgba(235, 246, 0, 1)",
          "rgba(11, 182, 82, 0.5)",
          "rgba(11, 182, 82, 1)",
          "rgba(11, 182, 82, 1)",
          "rgba(0, 155, 255, 1)",
          "rgba(0, 155, 255, 1)",
          "rgba(200, 150, 217, 1)",
        ],
        borderWidth: 2,
      },
    ],
  });
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    axios
      .get("https://sharpleaf.biz.ua/film-reviews-api/api-top5.php")
      .then((response) => {
        const data = response.data;
        const login = decoded.login;
        const userRecord = data.find((record) => record.login == login);
        if (userRecord) {
          const existValue = userRecord.exist == "true";
          setExist(existValue);
        } else {
          setExist(false);
          console.log("exist value:", false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("https://sharpleaf.biz.ua/film-reviews-api/api-all.php")
      .then((response) => {
        const data = response.data;
        const calculatedData = calculateData(data);

        const calculatedData2024 = calculateData2024(data);
        setData(calculatedData);
        setData2024(calculatedData2024);

        const filteredYear2023Data = data.filter(
          (item) =>
            item.date &&
            (item.date.endsWith(".23") ||
              item.date.endsWith("/23") ||
              item.date.endsWith(".2023") ||
              item.date.endsWith("/2023"))
        );
        const filteredYear2024Data = data.filter(
          (item) =>
            item.date &&
            (item.date.endsWith(".24") ||
              item.date.endsWith("/24") ||
              item.date.endsWith(".2024") ||
              item.date.endsWith("/2024"))
        );
        setYear2023Data(filteredYear2023Data);
        setYear2024Data(filteredYear2024Data);
        const movieData = getWordCountAndRating(data, "Фильм", login);
        const animeData = getWordCountAndRating(data, "Аниме", login);
        const cartoonData = getWordCountAndRating(data, "Мультфильм", login);
        const seriesData = getWordCountAndRating(data, "Сериал", login);
        const totalData = getWordCountAndRating(data, "", login);
        setMovieCount(movieData.count);
        setAnimeCount(animeData.count);
        setCartoonCount(cartoonData.count);
        setSeriesCount(seriesData.count);
        setTotalCount(totalData.count);
        setAverageMovieRating(movieData.averageRating);
        setAverageAnimeRating(animeData.averageRating);
        setAverageCartoonRating(cartoonData.averageRating);
        setAverageSeriesRating(seriesData.averageRating);
        setAverageTotalRating(totalData.averageRating);
        const userRatings = data.filter(
          (item) => item.login === login && !isNaN(parseFloat(item.rating))
        );
        const userRatings23 = filteredYear2023Data.filter(
          (item) => item.login === login && !isNaN(parseFloat(item.rating))
        );
        const userRatings24 = filteredYear2024Data.filter(
          (item) => item.login === login && !isNaN(parseFloat(item.rating))
        );
        const ratingsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const ratingsCount23 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const ratingsCount24 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        userRatings.forEach((item) => {
          const rating = parseFloat(item.rating);
          if (!isNaN(rating) && rating >= 1 && rating <= 10) {
            const index = Math.floor(rating) - 1;
            ratingsCount[index]++;
          }
        });
        const newDataHero = [
          {
            name: "1",
            value: ratingsCount[0],
          },
          {
            name: "2",
            value: ratingsCount[1],
          },
          {
            name: "3",
            value: ratingsCount[2],
          },
          {
            name: "4",
            value: ratingsCount[3],
          },
          {
            name: "5",
            value: ratingsCount[4],
          },
          {
            name: "6",
            value: ratingsCount[5],
          },
          {
            name: "7",
            value: ratingsCount[6],
          },
          {
            name: "8",
            value: ratingsCount[7],
          },
          {
            name: "9",
            value: ratingsCount[8],
          },
          {
            name: "10",
            value: ratingsCount[9],
          },
        ];
        setDataHero(newDataHero);
        userRatings23.forEach((item) => {
          const rating = parseFloat(item.rating);
          if (!isNaN(rating) && rating >= 1 && rating <= 10) {
            const index = Math.floor(rating) - 1;
            ratingsCount23[index]++;
          }
        });
        const newDataHero23 = [
          {
            name: "1",
            value: ratingsCount23[0],
          },
          {
            name: "2",
            value: ratingsCount23[1],
          },
          {
            name: "3",
            value: ratingsCount23[2],
          },
          {
            name: "4",
            value: ratingsCount23[3],
          },
          {
            name: "5",
            value: ratingsCount23[4],
          },
          {
            name: "6",
            value: ratingsCount23[5],
          },
          {
            name: "7",
            value: ratingsCount23[6],
          },
          {
            name: "8",
            value: ratingsCount23[7],
          },
          {
            name: "9",
            value: ratingsCount23[8],
          },
          {
            name: "10",
            value: ratingsCount23[9],
          },
        ];
        setDataHero23(newDataHero23);
        userRatings24.forEach((item) => {
          const rating = parseFloat(item.rating);
          if (!isNaN(rating) && rating >= 1 && rating <= 10) {
            const index = Math.floor(rating) - 1;
            ratingsCount24[index]++;
          }
        });

        const newDataHero24 = [
          {
            name: "1",
            value: ratingsCount24[0],
          },
          {
            name: "2",
            value: ratingsCount24[1],
          },
          {
            name: "3",
            value: ratingsCount24[2],
          },
          {
            name: "4",
            value: ratingsCount24[3],
          },
          {
            name: "5",
            value: ratingsCount24[4],
          },
          {
            name: "6",
            value: ratingsCount24[5],
          },
          {
            name: "7",
            value: ratingsCount24[6],
          },
          {
            name: "8",
            value: ratingsCount24[7],
          },
          {
            name: "9",
            value: ratingsCount24[8],
          },
          {
            name: "10",
            value: ratingsCount24[9],
          },
        ];
        setDataHero24(newDataHero24);
        setAllRatingsData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: ratingsCount,
            },
          ],
        }));
        setAllRatingsData23((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: ratingsCount23,
            },
          ],
        }));
        setAllRatingsData24((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: ratingsCount24,
            },
          ],
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getWordCountAndRating = (data, word, login) => {
    const filteredData = data.filter(
      (item) => item.genre && item.genre.includes(word) && item.login === login
    );
    const count = filteredData.length;
    let totalRating = 0;
    for (let i = 0; i < count; i++) {
      const rating = parseFloat(filteredData[i].rating);
      if (!isNaN(rating)) {
        totalRating += rating;
      }
    }
    const averageRating = count > 0 ? (totalRating / count).toFixed(2) : "0.00";
    return {
      count,
      averageRating,
    };
  };
  const getCountByGenre = (data, genre, login) => {
    if (!data) {
      return 0;
    }
    const filteredData = data.filter(
      (item) => item.genre.includes(genre) && item.login === login
    );
    const count = filteredData.length;
    return count;
  };
  const getAverageRatingByGenre = (data, genre, login) => {
    if (!data) {
      return "0.00";
    }
    const filteredData = data.filter(
      (item) => item.genre.includes(genre) && item.login === login
    );
    const count = filteredData.length;
    let totalRating = 0;
    for (let i = 0; i < count; i++) {
      const rating = parseFloat(filteredData[i].rating);
      if (!isNaN(rating)) {
        totalRating += rating;
      }
    }
    const averageRating = count > 0 ? (totalRating / count).toFixed(2) : "0.00";
    return averageRating;
  };
  const getAverageRating = (data) => {
    if (!data) {
      return "0.00";
    }
    const count = data.length;
    let totalRating = 0;
    for (let i = 0; i < count; i++) {
      const rating = parseFloat(data[i].rating);
      if (!isNaN(rating)) {
        totalRating += rating;
      }
    }
    const averageRating = count > 0 ? (totalRating / count).toFixed(2) : "0.00";
    return averageRating;
  };
  const handleDeleteLogin = () => {
    const logoutMessage = "Logout successful";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.setItem("logoutMessage", logoutMessage);
    history("/login");
    window.scrollTo(0, 0);
  };
  const top5movies = [
    { value: "cat", label: "Фильм 11" },
    { value: "dog", label: "Пила 20" },
    { value: "rabbit", label: "Витя" },
  ];
  const handleSwitchChange = (value) => {
    setExist(value);
    axios
      .post("https://sharpleaf.biz.ua/film-reviews-api/update-exist.php", {
        login: decoded.login,
        exist: value ? "true" : "false",
      })
      .then((response) => {
        console.log("Значение успешно отправлено на сервер.");
      })
      .catch((error) => {
        console.error("Ошибка при отправке значения на сервер:", error);
      });
  };

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [sortColumn2, setSortColumn2] = useState();
  const [sortType2, setSortType2] = useState();
  const [loading2, setLoading2] = useState(false);
  const [sortColumn24, setSortColumn24] = useState();
  const [sortType24, setSortType24] = useState();
  const [loading24, setLoading24] = useState(false);

  const dataTable = [
    {
      type: "Movies",
      evaluated: movieCount,
      average: averageMovieRating,
    },
    {
      type: "Anime",
      evaluated: animeCount,
      average: averageAnimeRating,
    },
    {
      type: "Cartoons",
      evaluated: cartoonCount,
      average: averageCartoonRating,
    },
    {
      type: "Serials",
      evaluated: seriesCount,
      average: averageSeriesRating,
    },
    { type: "All", evaluated: totalCount, average: averageTotalRating },
  ];

  const dataTable2 = [
    {
      type: "Movies",
      evaluated: getCountByGenre(year2023Data, "Фильм", login),
      average: getAverageRatingByGenre(year2023Data, "Фильм", login),
    },
    {
      type: "Anime",
      evaluated: getCountByGenre(year2023Data, "Аниме", login),
      average: getAverageRatingByGenre(year2023Data, "Аниме", login),
    },
    {
      type: "Cartoons",
      evaluated: getCountByGenre(year2023Data, "Мультфильм", login),
      average: getAverageRatingByGenre(year2023Data, "Мультфильм", login),
    },
    {
      type: "Serials",
      evaluated: getCountByGenre(year2023Data, "Сериал", login),
      average: getAverageRatingByGenre(year2023Data, "Сериал", login),
    },
    {
      type: "All",
      evaluated: year2023Data ? getCountByGenre(year2023Data, "", login) : 0,
      average: getAverageRatingByGenre(year2023Data, "", login),
    },
  ];
  const dataTable2024 = [
    {
      type: "Movies",
      evaluated: getCountByGenre(year2024Data, "Фильм", login),
      average: getAverageRatingByGenre(year2024Data, "Фильм", login),
    },
    {
      type: "Anime",
      evaluated: getCountByGenre(year2024Data, "Аниме", login),
      average: getAverageRatingByGenre(year2024Data, "Аниме", login),
    },
    {
      type: "Cartoons",
      evaluated: getCountByGenre(year2024Data, "Мультфильм", login),
      average: getAverageRatingByGenre(year2024Data, "Мультфильм", login),
    },
    {
      type: "Serials",
      evaluated: getCountByGenre(year2024Data, "Сериал", login),
      average: getAverageRatingByGenre(year2024Data, "Сериал", login),
    },
    {
      type: "All",
      evaluated: year2024Data ? getCountByGenre(year2024Data, "", login) : 0,
      average: getAverageRatingByGenre(year2024Data, "", login),
    },
  ];

  const handleSortColumn = (columnName) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (sortColumn === columnName) {
        setSortType(sortType === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(columnName);
        setSortType("asc");
      }
    }, 500);
  };

  const handleSortColumn2 = (columnName) => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      if (sortColumn2 === columnName) {
        setSortType2(sortType2 === "asc" ? "desc" : "asc");
      } else {
        setSortColumn2(columnName);
        setSortType2("asc");
      }
    }, 500);
  };
  const handleSortColumn24 = (columnName) => {
    setLoading24(true);
    setTimeout(() => {
      setLoading24(false);
      if (sortColumn24 === columnName) {
        setSortType24(sortType24 === "asc" ? "desc" : "asc");
      } else {
        setSortColumn24(columnName);
        setSortType24("asc");
      }
    }, 500);
  };
  const sortedData = () => {
    if (sortColumn && sortType) {
      return dataTable.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        return sortType === "asc" ? x - y : y - x;
      });
    }
    return dataTable;
  };

  const sortedData2 = () => {
    if (sortColumn2 && sortType2) {
      return dataTable2.sort((a, b) => {
        let x = a[sortColumn2];
        let y = b[sortColumn2];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        return sortType2 === "asc" ? x - y : y - x;
      });
    }
    return dataTable2;
  };
  const sortedData2024 = () => {
    if (sortColumn24 && sortType24) {
      return dataTable2024.sort((a, b) => {
        let x = a[sortColumn24];
        let y = b[sortColumn24];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        return sortType24 === "asc" ? x - y : y - x;
      });
    }
    return dataTable2024;
  };

  const getSortIndicator = (columnName) => {
    if (sortColumn === columnName) {
      return sortType === "asc" ? " ⇈" : " ⇊";
    }
    return " ⇵";
  };

  const getSortIndicator2 = (columnName) => {
    if (sortColumn2 === columnName) {
      return sortType2 === "asc" ? " ⇈" : " ⇊";
    }
    return " ⇵";
  };
  const getSortIndicator24 = (columnName) => {
    if (sortColumn24 === columnName) {
      return sortType24 === "asc" ? " ⇈" : " ⇊";
    }
    return " ⇵";
  };

  const progressData = sortedData2();
  const lastEvaluated =
    progressData.length > 0
      ? Math.max(...progressData.map((item) => item.evaluated))
      : 0;

  const progressData2024 = sortedData2024();
  const lastEvaluated2024 =
    progressData2024.length > 0
      ? Math.max(...progressData2024.map((item) => item.evaluated))
      : 0;

  return (
    <motion.div
      className="cabinet-wrapper"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <h1
        style={{
          textAlign: "center",
          margin: "0px",
          color: "white",
          fontSize: "30px",
        }}
      >
        Settings for user&ensp;
        {name}
      </h1>
      <div className="tab-header">
        <Button
          variant="shadow"
          className={`tab ${activeTab === 1 ? "active-tab" : "not-active-tab"}`}
          onClick={() => handleTabClick(1)}
        >
          Statistics for all time
        </Button>
        <Button
          variant="shadow"
          className={`tab ${activeTab === 2 ? "active-tab" : "not-active-tab"}`}
          onClick={() => handleTabClick(2)}
        >
          Statistics for 2023
        </Button>
        <Button
          variant="shadow"
          className={`tab ${activeTab === 3 ? "active-tab" : "not-active-tab"}`}
          onClick={() => handleTabClick(3)}
        >
          Statistics for 2024
        </Button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <div>
            <motion.table
              className="statistic-table"
              initial={{
                opacity: 0,
                y: -200,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="statistic-table-title">
                  <th colSpan="3">Estimate statistics for all time</th>
                </tr>
                <tr>
                  <th>Type:</th>
                  <th
                    onClick={() => handleSortColumn("evaluated")}
                    style={{ cursor: "pointer" }}
                  >
                    Evaluated:
                    {getSortIndicator("evaluated")}
                  </th>
                  <th
                    onClick={() => handleSortColumn("average")}
                    style={{ cursor: "pointer" }}
                  >
                    Average:
                    {getSortIndicator("average")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData().map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.evaluated}</td>
                    <td>{item.average}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
            <div className="area-chart-container">
              <AreaChart
                className="mt-4 h-72"
                data={chartdata}
                index="date"
                yAxisWidth={65}
                categories={["2023", "2024"]}
                colors={["emerald", "yellow"]}
                valueFormatter={valueFormatter}
              />
            </div>
            <div className="chart-container">
              <div className="space-y-3">
                <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content title-for-chart">
                  All Evaluations By Rating
                </span>
                <div className="flex justify-center ">
                  <DonutChart
                    data={datahero}
                    variant="donut"
                    valueFormatter={dataFormatter}
                    onValueChange={(v) => console.log(v)}
                    className="donut"
                    colors={[
                      "red-600",
                      "red-600",
                      "yellow-400",
                      "yellow-400",
                      "emerald-600",
                      "emerald-600",
                      "emerald-600",
                      "blue-600",
                      "blue-600",
                      "fuchsia-600",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {/* <div className="line-chart">
              <Line options={options} data={dataLine} />
            </div> */}
            <motion.table
              className="statistic-table"
              initial={{
                opacity: 0,
                y: -200,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="statistic-table-title">
                  <th colSpan="3">Estimate statistics for 2023</th>
                </tr>
                <tr>
                  <th
                    onClick={() => handleSortColumn2("type")}
                    style={{ cursor: "pointer" }}
                  >
                    Type:
                    {getSortIndicator2("type")}
                  </th>
                  <th
                    onClick={() => handleSortColumn2("evaluated")}
                    style={{ cursor: "pointer" }}
                  >
                    Evaluated:
                    {getSortIndicator2("evaluated")}
                  </th>
                  <th
                    onClick={() => handleSortColumn2("average")}
                    style={{ cursor: "pointer" }}
                  >
                    Average:
                    {getSortIndicator2("average")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData2().map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.evaluated}</td>
                    <td>{item.average}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
            <div className="chart-container">
              <div className="space-y-3">
                <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content title-for-chart">
                  Evaluations By Rating For 2023
                </span>
                <div className="flex justify-center ">
                  <DonutChart
                    data={datahero23}
                    variant="donut"
                    valueFormatter={dataFormatter}
                    onValueChange={(v) => console.log(v)}
                    className="donut"
                    colors={[
                      "red-600",
                      "red-600",
                      "yellow-400",
                      "yellow-400",
                      "emerald-600",
                      "emerald-600",
                      "emerald-600",
                      "blue-600",
                      "blue-600",
                      "fuchsia-600",
                    ]}
                  />
                </div>
              </div>
            </div>
            <Progress
              label={`${lastEvaluated} / 356`}
              size="md"
              value={lastEvaluated}
              maxValue={356}
              color="default"
              formatOptions={{ style: "percent" }}
              showValueLabel={true}
              className="progress-ui"
            />
          </div>
        )}
        {activeTab === 3 && (
          <div>
            {/* <div className="line-chart">
              <Line options={options2024} data={dataLine2024} />
            </div> */}
            <motion.table
              className="statistic-table"
              initial={{
                opacity: 0,
                y: -200,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="statistic-table-title">
                  <th colSpan="3">Estimate statistics for 2024</th>
                </tr>
                <tr>
                  <th
                    onClick={() => handleSortColumn24("type")}
                    style={{ cursor: "pointer" }}
                  >
                    Type:
                    {getSortIndicator24("type")}
                  </th>
                  <th
                    onClick={() => handleSortColumn24("evaluated")}
                    style={{ cursor: "pointer" }}
                  >
                    Evaluated:
                    {getSortIndicator24("evaluated")}
                  </th>
                  <th
                    onClick={() => handleSortColumn24("average")}
                    style={{ cursor: "pointer" }}
                  >
                    Average:
                    {getSortIndicator24("average")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData2024().map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.evaluated}</td>
                    <td>{item.average}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
            <div className="chart-container">
              <div className="space-y-3">
                <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content title-for-chart">
                  Evaluations By Rating For 2024
                </span>
                <div className="flex justify-center ">
                  <DonutChart
                    data={datahero24}
                    variant="donut"
                    valueFormatter={dataFormatter}
                    onValueChange={(v) => console.log(v)}
                    className="donut"
                    colors={[
                      "red-600",
                      "red-600",
                      "yellow-400",
                      "yellow-400",
                      "emerald-600",
                      "emerald-600",
                      "emerald-600",
                      "blue-600",
                      "blue-600",
                      "fuchsia-600",
                    ]}
                  />
                </div>
              </div>
            </div>
            <Progress
              label={`${lastEvaluated2024} / 356`}
              size="md"
              value={lastEvaluated2024}
              maxValue={356}
              color="default"
              formatOptions={{ style: "percent" }}
              showValueLabel={true}
              className="progress-ui"
            />
          </div>
        )}
      </div>
      <div className="settings-container">
        <h1 style={{ textAlign: "center", color: "white", fontSize: "30px" }}>
          User Profile {name}
        </h1>
        <Switch
          isSelected={exist}
          onValueChange={handleSwitchChange}
          color="primary"
          style={{ margin: "50px" }}
        >
          Open Profile
        </Switch>
        <div className="next-ui-accordion-container">
          {exist ? (
            <Accordion variant="shadow" selectionMode="multiple">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title={"Profile Link"}
              >
                <div className="next-ui-accordion">
                  <Snippet
                    size="lg"
                    symbol=""
                    variant="solid"
                    className="accordion-snippet"
                  >
                    {`${currentURL}/profile/${login}`}
                  </Snippet>
                  <Link
                    showAnchorIcon
                    href={`${currentURL}/profile/${login}`}
                    color="foreground"
                    isBlock
                    className="next-ui-link"
                  >
                    Go to Profile
                  </Link>
                </div>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title={"Top-5 Settings Link"}
              >
                <div className="next-ui-accordion">
                  <Snippet
                    size="lg"
                    symbol=""
                    variant="solid"
                    className="accordion-snippet"
                  >
                    {`${currentURL}/top5-settings/${login}`}
                  </Snippet>
                  <Link
                    showAnchorIcon
                    href={`${currentURL}/top5-settings/${login}`}
                    color="foreground"
                    isBlock
                    className="next-ui-link"
                  >
                    Go to Your Top-5 Settings
                  </Link>
                </div>
              </AccordionItem>
            </Accordion>
          ) : null}
        </div>
      </div>
      <div className="logout-container">
        <Popconfirm
          title={"Logout"}
          description={"Are you sure you want to logout?"}
          onConfirm={confirm}
          onCancel={cancel}
          okText={"Yes"}
          cancelText={"No"}
          okType="default"
        >
          <Button variant="flat" className="logout">
            Exit
          </Button>
        </Popconfirm>
        <Toaster />
      </div>
    </motion.div>
  );
};
export default Cabinet;
