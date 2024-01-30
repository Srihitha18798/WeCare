import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification.js";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState();

  const deleteAppointment = async () => {
    try {
      const response = await axios.delete(`${JSON_SERVER_URL}/${id}`);
      console.log("Delete request response", response);
      if (response.status === 200) {
        console.log("Booking deleted succesfully");
        navigate("/DeleteAppointment");
      }
    } catch (error) {
      console.log("Error reschedule booking", error);
    }
  };

  const showNotification = (id) => {
    setId(id);
    setSuccess(true);
  };
  const areUSureDelete = (choose) => {
    if (choose) {
      deleteAppointment();
    } else {
      navigate("/userHomeScreen");
    }
  };

  return (
    <>
      {success ? (
        <Notification
          message={"Are you sure you need to cancel the appointment?"}
          onDialog={areUSureDelete}
        />
      ) : (
        <Card
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "black",
            marginRight: "20px",
            width: "300px",
            color: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h4">
                Appointment Date:{appointment.appointmentDate}
              </Typography>
              <Typography variant="h6">Slot: {appointment.slot}</Typography>
              <br />
              <br />
              <Typography variant="body2">
                Booking id: {appointment.id}
              </Typography>
              <Typography variant="body2">
                User id: {appointment.userId}
              </Typography>
              <Typography variant="body2">
                Coach Id: {appointment.coachId}
              </Typography>
            </CardContent>
          </div>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginBottom: "20px",
                color: "white",
              }}
              onClick={() =>
                navigate("/RescheduleAppointment", {
                  state: {
                    bookingId: appointment.id,
                  },
                })
              }
            >
              Reschedule Appointment
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => {
                showNotification(appointment.id);
              }}
            >
              Cancel Appointment
            </Button>
            <br />
          </div>
        </Card>
      )}
    </>
  );
};

export default AppointmentCard;
