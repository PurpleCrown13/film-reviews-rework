import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../css/Users.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://sharpleaf.biz.ua/film-reviews-api/user-count-api.php")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Ошибка получения данных:", error);
      });
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
        <title>Users</title>
      </Helmet>
      <div className="users-box">
        {users.map((user) => (
          <div className="user" key={user.login}>
            <div className="user-name">{user.login}</div>
            <div className="watched">{user.count} watched</div>
            <Link to={`/profile/${user.login}`} className="vixi">
              <button>Visit</button>
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Users;
