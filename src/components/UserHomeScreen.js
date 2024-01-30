import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Navbar from "./Navbar";
import axios from "axios";
import CoachCard from "./CoachCard";

const JSON_SERVER_URL = "http://localhost:5000/coaches";

const UserHomeScreen = () => {
  const { user } = useContext(UserContext);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const getCoaches = async (e) => {
      try {
        const response = await axios.get(JSON_SERVER_URL);
        if (response.data.length > 0) {
          setCoaches(response.data);
          console.log(coaches);
        } else {
          console.log("No Coaches Available");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCoaches();
  }, [user]);

  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginLeft: "50px",
        }}
      >
        {coaches.map((coach, index) => (
          <CoachCard key={coach.id} coach={coach}></CoachCard>
        ))}
      </div>
    </>
  );
};

export default UserHomeScreen;
