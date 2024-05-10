import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../css/RegisterLogin.css";
const Register = () => {
  const history = useNavigate();
  const MySwal = withReactContent(Swal);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Nickname is required")
      .min(3, "Nickname must be 3 characters or more")
      .max(50, "Nickname must be 50 characters or less"),
    login: Yup.string()
      .required("Login is required")
      .min(3, "Login must be 3 characters or more")
      .max(50, "Login must be 50 characters or less"),
    pass: Yup.string()
      .required("Password is required")
      .min(3, "Password must be 3 characters or more")
      .max(50, "Password must be 50 characters or less"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      login: "",
      pass: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.name || !values.login || !values.pass) {
          return;
        }

        const checkLoginResponse = await fetch(
          "https://sharpleaf.biz.ua/film-reviews-api/api-check-login.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: values.login }),
          }
        );

        if (checkLoginResponse.ok) {
          const { isLoginUnique } = await checkLoginResponse.json();

          if (isLoginUnique) {
            const registerResponse = await fetch(
              "https://sharpleaf.biz.ua/film-reviews-api/api-register.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: values.name,
                  login: values.login,
                  pass: values.pass,
                }),
              }
            );

            if (registerResponse.ok) {
              const secondTableResponse = await fetch(
                "https://sharpleaf.biz.ua/film-reviews-api/api-register-top5.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    login: values.login,
                    name: values.name,
                  }),
                }
              );

              if (secondTableResponse.ok) {
                console.log("Данные успешно добавлены в обе таблицы");
                formik.resetForm();
                history(`/login`);
              } else {
                console.log("Ошибка при добавлении данных во вторую таблицу");
              }
            } else {
              console.log("Ошибка при добавлении данных в первую таблицу");
            }
          } else {
            alert("User already exist");
          }
        } else {
          MySwal.fire({
            icon: "error",
            title: "Sorry!",
            text: "Login already exist!",
            timer: "2000",
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.log("Ошибка:", error);
        history(`/login`);
      }
    },
  });

  return (
    <motion.div
      className="login-container"
      initial={{
        scale: 0.3,
      }}
      animate={{
        scale: 0.9,
      }}
      transition={{
        delay: 0.2,
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="p-12 rounded-lg shadow-lg text-white w-full  register-form"
      >
        <h2 className="text-4xl font-bold mb-8">Register</h2>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-4">
            Nickname
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your nickname"
            className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="login" className="block mb-4">
            Login
          </label>
          <input
            type="text"
            id="login"
            placeholder="Enter your login"
            className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
            {...formik.getFieldProps("login")}
          />
          {formik.touched.login && formik.errors.login && (
            <div className="error">{formik.errors.login}</div>
          )}
        </div>
        <div className="mb-8">
          <label htmlFor="pass" className="block mb-4">
            Password
          </label>
          <input
            type="password"
            id="pass"
            placeholder="Enter your password"
            className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
            {...formik.getFieldProps("pass")}
          />
          {formik.touched.pass && formik.errors.pass && (
            <div className="error">{formik.errors.pass}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mb-4"
        >
          Register
        </button>
        <Link to="/login" className="redir-link">
          Sign In
        </Link>
      </form>
    </motion.div>
  );
};

export default Register;
