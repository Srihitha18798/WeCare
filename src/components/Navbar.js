import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import { UserContext } from "../UserContext";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { coach } = useContext(UserContext);

  const { handleUserLogout } = useContext(UserContext);
  const { handleCoachLogout } = useContext(UserContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [isCoachLoggedIn, setIsCoachLoggedIn] = useState(true);

  useEffect(() => {
    console.log("user", user);
    console.log("coach", coach);
    if (user === undefined) {
      setIsUserLoggedIn(false);
    }
    if (user === null) {
      setIsUserLoggedIn(false);
    }
    if (coach === undefined) {
      setIsCoachLoggedIn(false);
    }
    if (coach === null) {
      setIsCoachLoggedIn(false);
    }
  }, [user, coach]);

  const LogoutClick = () => {
    if (isUserLoggedIn) {
      handleUserLogout();
    }
    if (isCoachLoggedIn) {
      handleCoachLogout();
    }
    navigate("/Home");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">WeCare</div>
      {isUserLoggedIn || isCoachLoggedIn ? (
        <ul className="navbar-links" style={{ color: "white" }}>
          <PersonIcon />
          {isUserLoggedIn ? (
            <Link to="/UserViewProfile">View Profile</Link>
          ) : (
            <Link to="/CoachViewProfile">View Profile</Link>
          )}
          &nbsp; &nbsp;
          <EventNoteIcon />
          {isUserLoggedIn ? (
            <Link to="/UserAppointments">My Appointments</Link>
          ) : (
            <Link to="/CoachSchedules">My Schedules</Link>
          )}
          &nbsp; &nbsp;
          <CallIcon />
          Call us: 080 2233447 &nbsp; &nbsp;
          <LogoutIcon />
          <Button
            className="navbar-link button"
            style={{
              color: "white",
              textTransform: "none",
              paddingLeft: "0",
              fontSize: "1em",
              fontStyle: "italic",
            }}
            onClick={() => LogoutClick()}
          >
            Logout
          </Button>
          &nbsp; &nbsp;
        </ul>
      ) : (
        <ul className="navbar-links" style={{ color: "white" }}>
          <CallIcon />
          Call us: 080 2233447
        </ul>
      )}
    </div>
  );
};

export default Navbar;
