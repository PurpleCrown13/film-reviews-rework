import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "../components/Home";
import Add from "../components/Add";
import CountdownPage from "../components/CountdownPage";
import Users from "../components/Users";
import Register from "../components/Register";
import Best from "../components/Best";
import Login from "../components/Login";
import Plannes from "../components/Plannes";
import Franchise from "../components/Franchise";
import FranchiseDetailed from "../components/FranchiseDetailed";
import Top5Settings from "../components/Top5Settings";
import CabinetDetailed from "../components/CabinetDetailed";
import Cabinet from "../components/Cabinet";
import MovieCardDetailed from "../components/MovieCardDetailed";
import Edit from "../components/Edit";
import Calendar from "../components/Calendar";
import "./App.css";
const currentURL = `${window.location.protocol}//${window.location.host}`;
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
import { jwtDecode } from "jwt-decode";
const token = getCookie("token");
const decoded = token ? jwtDecode(token) : null;
const login = decoded ? decoded.login : null;
const Navigation = () => {
  return (
    <div className="header-links">
      <div className="header-links-block1">
        <NavLink to="/" className="header-link" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/add" className="header-link" activeClassName="active">
          Add
        </NavLink>
        <NavLink to="/best" className="header-link" activeClassName="active">
          G.O.A.T.
        </NavLink>
        <NavLink to="/plans" className="header-link" activeClassName="active">
          Plans
        </NavLink>
      </div>
      <div className="header-links-block2">
        <NavLink
          to="/franchise"
          className="header-link"
          activeClassName="active"
        >
          Franchises
        </NavLink>
        <NavLink to="/users" className="header-link" activeClassName="active">
          Users
        </NavLink>
        {/* <div className="badge">New</div> */}
        <NavLink
          to="/countdown"
          className="header-link"
          activeClassName="active"
        >
          Countdown
        </NavLink>
        {/* <div className="badge">New</div> */}
      </div>
      <div className="header-links-block2">
        <NavLink
          to={`/profile/${login}`}
          className="header-link"
          activeClassName="active"
        >
          My Profile
        </NavLink>
        <NavLink
          to="/calendar"
          className="header-link"
          activeClassName="active"
        >
          Calendar
        </NavLink>
        {/* <div className="badge">New</div> */}
        <NavLink to="/cabinet" className="header-link" activeClassName="active">
          Settings
        </NavLink>
      </div>
    </div>
  );
};

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/users" element={<Users />} />
      <Route path="/best" element={<Best />} />
      <Route path="/countdown" element={<CountdownPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/plans" element={<Plannes />} />
      <Route path="/franchise" element={<Franchise />} />
      <Route path="/franchise/:franchise" element={<FranchiseDetailed />} />
      <Route path="/top5-settings/:login" element={<Top5Settings />} />
      <Route path="/profile/:username" element={<CabinetDetailed />} />
      <Route path="/cabinet" element={<Cabinet />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/movies/:id" element={<MovieCardDetailed />} />
      <Route path="/movies/:id/edit" element={<Edit />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <div className="total-site-container">
        <div className="header-box">
          <div className="header-2">
            <div className="header-content">Movie Heaven</div>
          </div>
        </div>
        <div className="header-3">
          <Navigation />
        </div>
        <div className="main">
          <PageRoutes />
          <div className="footer">Malignant Corporation 2023-2024</div>
        </div>
      </div>
    </Router>
  );
};

export default App;
