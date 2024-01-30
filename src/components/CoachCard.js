import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import coachImage from "../coach.png";
import { useNavigate } from "react-router-dom";

const CoachCard = ({ coach }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "black",
        marginRight: "20px",
        width: "400px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "20px" }}>
        <CardMedia
          component="img"
          height="100"
          image={coachImage}
          alt=""
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        ></CardMedia>
      </div>
      <div style={{ textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5">{coach.name}</Typography>
          <Typography variant="h6">Coach Id: {coach.id}</Typography>
          <Typography variant="body2">
            Mobile Number: {coach.mobileNumber}
          </Typography>
          <Typography variant="body2">
            Speciality: {coach.speciality}
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "20px",
            color: "white",
          }}
          onClick={() =>
            navigate("/bookAppointment", {
              state: {
                coachId: coach.id,
              },
            })
          }
        >
          Book an Appointment
        </Button>
      </div>
    </Card>
  );
};

export default CoachCard;
