import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Navbar from "./Navbar";
import {
  Button,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import scheduleIcon from "../schedule_1.png";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const RescheduleAppointment = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const location = useLocation();
  const bookingId = location.state?.bookingId;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const existedResponse = await axios.get(
        `${JSON_SERVER_URL}?id=${bookingId}`
      );
      const updatedData = { ...existedResponse.data[0], ...data };
      console.log(updatedData);
      const response = await axios.patch(`${JSON_SERVER_URL}/${bookingId}`, {
        appointmentDate: data.appointmentDate,
        slot: data.slot,
      });
      console.log("response", response);
      console.log("Patch request response", response);
      if (response.status === 200) {
        setSuccessMsg("Rescheduled Succesfully");
        setErrMsg("");
        setSuccess(true);
      } else {
        setSuccessMsg("");
        setErrMsg("Failed to Reschedule Booking. Please try again.");
      }
    } catch (error) {
      console.log("Error reschedule booking", error);
      setSuccessMsg("");
      setErrMsg("Failed to Reschedule Booking. Please try again.");
    }
  };

  const validateDate = () => {
    const appointmentDate = watch("appointmentDate");
    const today = new Date();

    const selectedDate = new Date(appointmentDate);

    const daysDifference = Math.floor(
      (selectedDate - today) / (1000 * 60 * 60 * 24)
    );

    return daysDifference >= 0 && daysDifference <= 7;
  };

  return (
    <>
      <Navbar />
      {success ? (
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
              Your Appointment is rescheduled succesfully
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
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            marginTop: "100px",
            backgroundColor: "black",
            borderRaduis: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            width: "80%",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={scheduleIcon}
              alt=""
              style={{ width: "80px", marginRight: "10px" }}
            ></img>
            <h2 style={{ fontSize: "1.5em" }}>Reschedule your Appointment</h2>
          </div>
          <br />
          <div>
            <InputLabel style={{ color: "white", paddingRight: "340px" }}>
              Date of Appointment:
            </InputLabel>
            <Controller
              name="appointmentDate"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: validateDate,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="date"
                  {...field}
                  error={!!errors.appointmentDate}
                  helperText={
                    errors.appointmentDate
                      ? "Appointment Date should be any upcoming 7 days."
                      : ""
                  }
                  InputProps={{ style: { backgroundColor: "white" } }}
                  FormHelperTextProps={{
                    style: {
                      backgroundColor: "black",
                      color: "red",
                    },
                  }}
                ></TextField>
              )}
            ></Controller>
          </div>
          <br />
          <div>
            <InputLabel style={{ color: "white", paddingRight: "390px" }}>
              Prefered Slot:
            </InputLabel>
            <Controller
              name="slot"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field} style={{ color: "white" }}>
                  <FormControlLabel
                    style={{ color: "white" }}
                    value="9 AM to 10 AM"
                    control={<Radio style={{ color: "white" }} />}
                    label="9 AM to 10 AM"
                  />
                  <FormControlLabel
                    style={{ color: "white" }}
                    value="10 AM to 11 AM"
                    control={<Radio style={{ color: "white" }} />}
                    label="10 AM to 11 AM"
                  />
                  <FormControlLabel
                    style={{ color: "white" }}
                    value="11 AM to 12 PM"
                    control={<Radio style={{ color: "white" }} />}
                    label="11 AM to 12 PM"
                  />
                  <FormControlLabel
                    style={{ color: "white" }}
                    value="2 PM to 3 PM"
                    control={<Radio style={{ color: "white" }} />}
                    label="2 PM to 3 PM"
                  />
                  <FormControlLabel
                    style={{ color: "white" }}
                    value="3 PM to 4 PM"
                    control={<Radio style={{ color: "white" }} />}
                    label="3 PM to 4 PM"
                  />
                  <FormControlLabel
                    style={{ color: "white" }}
                    value="4 PM to 5 PM"
                    control={<Radio style={{ color: "white" }} />}
                    label="4 AM to 5 PM"
                  />
                </RadioGroup>
              )}
            ></Controller>
          </div>
          <br />
          <div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              style={{
                color: "white",
                backgroundColor: "green",
                marginTop: "20px",
              }}
            >
              Confirm Your Appointment
            </Button>
            <br />
            {successMsg && <p>{successMsg}</p>}
            {errMsg && <p>{errMsg}</p>}
          </div>
        </form>
      )}
    </>
  );
};

export default RescheduleAppointment;
