import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import coachImage from "../coach.png";
import { UserContext } from "../UserContext";
import axios from "axios";
import Navbar from "./Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:5000/coaches";

const CoachViewProfile = () => {
  const { coach } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCoachData = async (e) => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?id=${coach}`);
        if (response.data.length === 1) {
          setProfile(response.data[0]);
          console.log(profile);
        } else {
          console.log("Coach not found");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getCoachData();
  }, [coach]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Card
          style={{
            color: "white",
            backgroundColor: "black",
            borderRaduis: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            width: "100%",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
            maxHeight: "500px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", padding: "20px" }}
          >
            <CardMedia
              component="img"
              height="100"
              image={coachImage}
              alt=""
              style={{
                borderRadius: "50%",
                width: "200px",
                height: "200px",
                objectFit: "cover",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            ></CardMedia>
            <CardContent>
              <Typography variant="h6">Coach Id:{coach}</Typography>
              <Typography variant="body1">
                Date of Birth: {profile.dateOfBirth}
              </Typography>
              <Typography variant="body1">
                Mobile No: {profile.mobileNumber}
              </Typography>
              <Typography variant="body1">
                Spciality: {profile.speciality}
              </Typography>
            </CardContent>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/coachHomeScreen")}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Card>
      </div>
    </>
  );
};

export default CoachViewProfile;
