import { Button, Card, CardMedia } from "@mui/material";
import React from "react";
import user from "../user.png";
import coach from "../coach.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <h1 style={{ textAlign: "center", fontSize: "3em", marginTop: "50px" }}>
        We are at the heart of appropraite care
      </h1>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexWrap: "wrap",
          gap: "0",
          justifyContent: "space-around",
        }}
      >
        <Card
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "black",
            width: "300px",
            height: "400px",
          }}
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              height="100"
              image={coach}
              alt=""
              style={{
                borderRadius: "50%",
                width: "200px",
                height: "200px",
                objectFit: "cover",
                margin: "10px",
              }}
            ></CardMedia>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginBottom: "20px",
                color: "white",
              }}
              onClick={() => navigate("/CoachLogin")}
            >
              Login as a Coach
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginBottom: "10px",
                color: "white",
              }}
              onClick={() => navigate("/CoachSignUp")}
            >
              Join as a Coach
            </Button>
          </div>
        </Card>
        <Card
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "black",
            width: "300px",
            height: "400px",
          }}
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              height="100"
              image={user}
              alt=""
              style={{
                borderRadius: "50%",
                width: "200px",
                height: "200px",
                objectFit: "cover",
                margin: "10px",
              }}
            ></CardMedia>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginBottom: "20px",
                color: "white",
              }}
              onClick={() => navigate("/UserLogin")}
            >
              Login as a User
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginBottom: "20px",
                color: "white",
              }}
              onClick={() => navigate("/UserSignUp")}
            >
              Join as a User
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;
