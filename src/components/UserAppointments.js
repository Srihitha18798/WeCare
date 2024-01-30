import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../UserContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const UserAppointments = () => {
  const { user } = useContext(UserContext);
  const [userAppointments, setUserAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAppointments = async (e) => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?userId=${user}`);
        if (response.data.length > 0) {
          setUserAppointments(response.data);
          console.log(userAppointments);
        } else {
          console.log("No Appointments found");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getUserAppointments();
  }, [user]);

  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginLeft: "50px",
        }}
      >
        {userAppointments.map((appointment, index) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          ></AppointmentCard>
        ))}
      </div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate("/userHomeScreen")}
      >
        <ArrowBackIcon />
        Back
      </Button>
    </>
  );
};

export default UserAppointments;
