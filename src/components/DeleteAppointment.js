import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DeleteAppointment = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        background: "black",
        color: "white",
        width: "400px",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ marginTop: "15px" }}>
          Your Appointment is cancelled succesfully
        </p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/userHomeScreen")}
        >
          <ArrowBackIcon />
          Back
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default DeleteAppointment;
