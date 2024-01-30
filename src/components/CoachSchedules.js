import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Navbar from "./Navbar";
import axios from "axios";
import CoachScheduleCard from "./CoachScheduleCard";
import scheduleIcon from "../schedule_1.png";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const CoachSchedules = () => {
  const { coach } = useContext(UserContext);
  const [coachSchedules, setCoachSchedules] = useState([]);
  const [Noschedules, setNoSchedules] = useState(false);

  useEffect(() => {
    const getCoachSchedules = async (e) => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?coachId=${coach}`);
        if (response.data.length > 0) {
          setCoachSchedules(response.data);
          console.log(coachSchedules);
          setNoSchedules(false);
        } else {
          console.log("No Schedules found");
          setNoSchedules(true);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getCoachSchedules();
  }, [coach]);

  return (
    <>
      <Navbar></Navbar>
      {Noschedules ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <img
              src={scheduleIcon}
              alt=""
              style={{ width: "150px", height: "150px" }}
            ></img>{" "}
          </div>
          <div style={{ textAlign: "center" }}>
            <h6 style={{ fontSize: "2em", marginTop: "2px" }}>
              No Planned Schedules Yet
            </h6>
          </div>
        </>
      ) : (
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginLeft: "50px",
          }}
        >
          {coachSchedules.map((schedule, index) => (
            <CoachScheduleCard
              key={schedule.id}
              schedule={schedule}
            ></CoachScheduleCard>
          ))}
        </div>
      )}
    </>
  );
};

export default CoachSchedules;
