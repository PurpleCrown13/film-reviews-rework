import React, { useEffect, useState } from "react";
import "../css/Calendar.css";
import axios from "axios";
import { parse, startOfMonth, getDay, format } from "date-fns"; // Добавляем функции startOfMonth, getDay и format из библиотеки date-fns
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

const Calendar = () => {
  const [movieDates, setMovieDates] = useState([]);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("token");
  const decoded = token ? jwtDecode(token) : null;
  const login = decoded ? decoded.login : null;
  const fetchMovieDates = async () => {
    try {
      const response = await axios.get(
        "https://sharpleaf.biz.ua/movie.heaven.api/api-all.php"
      );
      const dates = response.data
        .filter((movie) => movie.login === login)
        .map((movie) => parse(movie.date, "dd/MM/yyyy", new Date()));
      setMovieDates(dates);
    } catch (error) {
      console.error("Error fetching movie dates:", error);
    }
  };

  useEffect(() => {
    fetchMovieDates();
  }, []);

  const isMovieDay = (date) => {
    return movieDates.some((movieDate) => {
      return (
        movieDate.getFullYear() === date.getFullYear() &&
        movieDate.getMonth() === date.getMonth() &&
        movieDate.getDate() === date.getDate()
      );
    });
  };

  const renderMonth = (year, month) => {
    const days = [];
    const firstDayOfMonth = startOfMonth(new Date(year, month));
    let startDayIndex = getDay(firstDayOfMonth);
    if (startDayIndex === 0) {
      startDayIndex = 7;
    }
    const totalDays = new Date(year, month + 1, 0).getDate();
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 1; i < startDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="day empty-day"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(year, month, day);
      const isPastDate = currentDate < new Date(); // Проверяем, прошла ли дата
      const isCurrentDate =
        currentDate.toDateString() === new Date().toDateString(); // Проверяем, является ли текущей датой
      const isUnwatchedMovie = isPastDate && !isMovieDay(currentDate); // Проверяем, не было ли просмотра и дата уже прошла
      const classNames = `day ${isMovieDay(currentDate) ? "movie-day" : ""} ${
        isUnwatchedMovie && !isCurrentDate ? "unwatched-movie" : ""
      } ${isCurrentDate ? "current-date" : ""}`;
      days.push(
        <div key={currentDate.toISOString()} className={classNames}>
          {day}
        </div>
      );
    }

    return (
      <div key={`${year}-${month}`} className="month">
        <div className="month-header">
          {new Date(year, month).toLocaleString("en-US", { month: "long" })}
        </div>
        <div className="days">
          {weekDays.map((day, index) => (
            <div key={`weekday-${index}`} className="day week-day">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const months = [];
    const year = 2024;

    for (let month = 0; month < 12; month++) {
      months.push(renderMonth(year, month));
    }

    return months;
  };

  return (
    <div className="calendar-page">
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      <div className="year-header">2024</div>
      <div className="calendar">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
