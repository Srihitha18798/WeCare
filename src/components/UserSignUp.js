import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import user from "../user.png";

const JSON_SERVER_URL = "http://localhost:5000/users";

const UserSignUp = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(JSON_SERVER_URL, data);
      console.log("POST request response", response.data.id);
      setSuccess(true);
      setUserId(response.data.id);
    } catch (error) {
      console.log("Error registering user", error);
    }
  };

  const validateDob = () => {
    const dob = watch("dateOfBirth");
    const today = new Date();

    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    console.log(age);
    if (age < 20 || age > 100) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Navbar />
      {success ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <img
              src={user}
              alt=""
              style={{ width: "350px", height: "350px" }}
            ></img>
          </div>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "3em", marginTop: "2px" }}>
              Account created successfully !
            </h1>
            <h3 style={{ fontSize: "2em", marginTop: "0px" }}>
              Your user id is {userId}
            </h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/UserLogin")}
            >
              Login now
            </Button>
          </div>
        </>
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
            width: "100%",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  justifyContent: "center",
                }}
              >
                <img
                  src={user}
                  alt=""
                  style={{ width: "80px", marginRight: "20px" }}
                ></img>
                <h2 style={{ fontSize: "2em", margin: 0 }}>User Profile</h2>
              </div>
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "290px" }}>
                Name:
              </InputLabel>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 3, maxLength: 50 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.name}
                    helperText={
                      errors.name ? "Name should have 3 to 50 characters" : ""
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "260px" }}>
                Password:
              </InputLabel>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 5, maxLength: 10 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    className="form-input"
                    {...field}
                    error={!!errors.password}
                    helperText={
                      errors.password
                        ? "Password should have 5 to 10 characters"
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "220px" }}>
                Mobile Number:
              </InputLabel>
              <Controller
                name="mobileNumber"
                type="number"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^[0-9]{10}$/ }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    fullWidth
                    {...field}
                    error={!!errors.mobileNumber}
                    helperText={
                      errors.mobileNumber
                        ? "Mobile Number should have 10 digits"
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "290px" }}>
                Email:
              </InputLabel>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email ? "Email field is required." : ""}
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "240px" }}>
                Date of Birth:
              </InputLabel>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: validateDob,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="date"
                    {...field}
                    error={!!errors.dateOfBirth}
                    helperText={
                      errors.dateOfBirth
                        ? "Age should be between 20 and 100 years"
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "280px" }}>
                Gender:
              </InputLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field} style={{ color: "white" }}>
                    <FormControlLabel
                      style={{ color: "white" }}
                      value="M"
                      control={<Radio style={{ color: "white" }} />}
                      label="Male"
                    />
                    <FormControlLabel
                      style={{ color: "white" }}
                      value="F"
                      control={<Radio style={{ color: "white" }} />}
                      label="Female"
                    />
                  </RadioGroup>
                )}
              ></Controller>
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "270px" }}>
                Pincode:
              </InputLabel>
              <Controller
                name="pincode"
                type="number"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^[0-9]{6}$/ }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    fullWidth
                    {...field}
                    error={!!errors.pincode}
                    helperText={
                      errors.pincode ? "Pincode should have 6 digits" : ""
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "300px" }}>
                City:
              </InputLabel>

              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ minLength: 6, maxLength: 20 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.city}
                    helperText={
                      errors.city ? "City should have 6 to 20 characters." : ""
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "290px" }}>
                State:
              </InputLabel>

              <Controller
                name="state"
                control={control}
                defaultValue=""
                rules={{ minLength: 6, maxLength: 20 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.state}
                    helperText={
                      errors.state
                        ? "State should have 6 to 20 characters."
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
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ color: "white", paddingRight: "280px" }}>
                Country:
              </InputLabel>

              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{ minLength: 6, maxLength: 20 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.country}
                    helperText={
                      errors.country
                        ? "Country should have 6 to 20 characters."
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
            </Grid>
            <br />
            <br />
            <br />
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  marginTop: "20px",
                  width: "150px",
                  alignSelf: "flex-end",
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default UserSignUp;
