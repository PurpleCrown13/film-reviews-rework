import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../css/Franchise.css";
import { Helmet } from "react-helmet";
import useSWR from "swr";
import { jwtDecode } from "jwt-decode";

const Franchise = () => {
  window.scrollTo(0, 0);

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

  const {
    data: franchiseData,
    error,
    isValidating,
  } = useSWR(
    `https://sharpleaf.biz.ua/movie.heaven.api/api-all.php?login=${login}`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      const filteredDataByLogin = data.filter((item) => item.login === login);
      return filteredDataByLogin;
    },
    {
      revalidateOnMount: true,
    }
  );

  if (error) return "Error.";
  if (isValidating)
    return (
      <div className="spinner">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  const filteredData = franchiseData.filter((item, index, self) => {
    return (
      self.findIndex((i) => i.franchise === item.franchise) === index &&
      item.franchise !== ""
    );
  });

  const franchiseAverages = filteredData.map((item) => {
    const franchiseItems = franchiseData.filter(
      (i) => i.franchise === item.franchise
    );
    const ratings = franchiseItems.map((i) => parseFloat(i.rating));
    const averageRating =
      ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
    return { franchise: item.franchise, averageRating };
  });

  const handleRowClickFranchise = (itemFr) => {
    history(`/franchise/${itemFr}`);
  };

  // const rowVariants = {
  //   hidden: { opacity: 0, y: -100 },
  //   visible: { opacity: 1, y: 0 },
  // };

  const hoverVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      className="fra-wrapper"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Helmet>
        <title>Franchises</title>
      </Helmet>
      <table className="customTable">
        <thead>
          <tr>
            <th>Franchise Name</th>
            <th>Added</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {franchiseAverages.map((item, index) => (
            <motion.tr
              key={item.franchise}
              onClick={() => handleRowClickFranchise(item.franchise)}
              // variants={rowVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.td variants={hoverVariants}>{item.franchise}</motion.td>
              <motion.td variants={hoverVariants}>
                {
                  franchiseData.filter((i) => i.franchise === item.franchise)
                    .length
                }
              </motion.td>
              <motion.td variants={hoverVariants}>
                {isNaN(item.averageRating)
                  ? "N/A"
                  : item.averageRating.toFixed(1)}
              </motion.td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Franchise;
