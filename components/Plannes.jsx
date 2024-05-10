import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../css/Plannes.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";

const Plannes = () => {
  const [plans, setPlans] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      fetchPlans();
    }
  }, []);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://sharpleaf.biz.ua/film-reviews-api/api-all-plans.php"
      );
      const filteredPlans = response.data.filter(
        (plan) => plan.login === login
      );
      setPlans(filteredPlans);
      setIsLoading(false);
    } catch (error) {
      console.error("Error retrieving plans:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    try {
      await axios.post(
        "https://sharpleaf.biz.ua/film-reviews-api/api-add-plans.php",
        {
          login: login,
          name: inputValue,
        }
      );

      fetchPlans();
      setInputValue("");
    } catch (error) {
      console.error("Error submitting plan:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://sharpleaf.biz.ua/film-reviews-api/delete-plans.php?id=${id}`
      );
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={isLoading}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <Helmet>
          <title>Plans</title>
        </Helmet>
        <div className="plannes-wrapper">
          {!isLoading && (
            <>
              <form onSubmit={handleSubmit} className="add-plannes">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />

                <br />
                <div className="submit-container">
                  <Button variant="flat" className="" type="submit">
                    Add Plan
                  </Button>
                </div>
              </form>
              <div className="plannes-table">
                <table>
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>Your Plans</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => (
                      <tr key={plan.id}>
                        <td>{plan.name}</td>
                        <td
                          className="trash-button"
                          onClick={() => handleDelete(plan.id)}
                        >
                          {plan.login === login && (
                            <img src="/delete2.svg" alt="Delete" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Plannes;
