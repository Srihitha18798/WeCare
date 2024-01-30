import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Navbar from "./Navbar";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import userImage from "../user.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:5000/users";

const UserViewProfile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async (e) => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?id=${user}`);
        if (response.data.length === 1) {
          setProfile(response.data[0]);
          console.log(profile);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getUserData();
  }, [user]);

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
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
            maxHeight: "600px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", padding: "20px" }}
          >
            <CardMedia
              component="img"
              height="100"
              image={userImage}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <CardContent>
                <Typography variant="h6">{profile.name}</Typography>
                <Typography variant="body1">
                  Date of Birth: {profile.dateOfBirth}
                </Typography>
                <Typography variant="body1">
                  Mobile No: {profile.mobileNumber}
                </Typography>
                <Typography variant="body1">
                  Address: {profile.city},{profile.state},{profile.country}
                </Typography>
                <Typography variant="body1">
                  Pincode: {profile.pincode}
                </Typography>
              </CardContent>
            </div>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/userHomeScreen")}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Card>
      </div>
    </>
  );
};

export default UserViewProfile;
