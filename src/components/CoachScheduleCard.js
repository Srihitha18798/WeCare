import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const CoachScheduleCard = ({ schedule }) => {
  return (
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
            Appointment Date:{schedule.appointmentDate}
          </Typography>
          <Typography variant="h6">Slot: {schedule.slot}</Typography>
          <br />
          <br />
          <Typography variant="body2">Booking id: {schedule.id}</Typography>
          <Typography variant="body2">User id: {schedule.userId}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CoachScheduleCard;
