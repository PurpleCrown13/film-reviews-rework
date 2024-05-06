import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/FranchiseDetailed.css";
import { Helmet } from "react-helmet";
import useSWR from "swr";
import { jwtDecode } from "jwt-decode";

const FranchiseDetailed = () => {
  window.scrollTo(0, 0);
  const { franchise } = useParams();
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
    "https://sharpleaf.biz.ua/movie.heaven.api/api-all.php",
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data.filter(
        (item) => item.franchise === franchise && item.login === login
      );
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

  const handleRowClick = (itemId) => {
    history(`/movies/${itemId}`);
  };

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
        <title>Frachise {franchise}</title>
      </Helmet>
      <div>
        <p className="f-d-title"> Frachise {franchise}</p>
        <div className="franchise-detaile-container">
          <motion.table
            className="detailed-table"
            initial={{
              opacity: 0,
              // y: 20,
            }}
            animate={{
              opacity: 1,
              // y: 0,
              // transition: {
              //   delay: 0.1,
              //   duration: 0.3,
              // },
            }}
          >
            <thead>
              <tr>
                <th>Part</th>
                <th>Image</th>
                <th>Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <motion.tbody>
              {franchiseData.map((item, index) => (
                <motion.tr
                  key={index}
                  onClick={() => handleRowClick(item.id)}
                  className="clickable-row"
                  initial={{
                    opacity: 0,
                    // y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    // y: 0,
                    // transition: {
                    //   delay: 0.2 + index * 0.1,
                    //   duration: 0.3,
                    // },
                  }}
                >
                  <td className="f-d-season">{item.season}</td>
                  <td>
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <div className="f-d-rating">{item.rating}</div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
        </div>
      </div>
    </motion.div>
  );
};

export default FranchiseDetailed;
