import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "./Navbar";
import user from "../user.png";
import { Button, InputLabel, TextField } from "@mui/material";

const JSON_SERVER_URL = "http://localhost:5000/users";

const UserLogin = () => {
  const { handleUserLogin } = useContext(UserContext);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userResponse = await axios.get(
        `${JSON_SERVER_URL}?id=${data.userId}`
      );
      console.log("response", userResponse);
      if (userResponse.data.length === 1) {
        const userData = userResponse.data[0];
        console.log("userdata", userData);
        if (userData.password === data.password) {
          console.log(data.name + " You are successfully Logged In");
          setSuccessMsg("You have succesfully Logged In");
          handleUserLogin(data.userId);
          navigate("/UserHomeScreen");
        } else {
          console.log("UserId or Password is not matching with our records");
          setErrMsg("UserId or Password is not matching with our records");
        }
      } else {
        console.log("User not found");
        setErrMsg("User not found");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error during login");
    }
  };

  return (
    <>
      <Navbar />

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
          maxWidth: "400px",
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
            src={user}
            alt=""
            style={{ width: "80px", marginRight: "10px" }}
          ></img>
          <h2 style={{ fontSize: "1.8em" }}>Login as User</h2>
        </div>
        <div>
          <InputLabel style={{ color: "white", paddingRight: "340px" }}>
            User Id:
          </InputLabel>
          <Controller
            name="userId"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.userId}
                helperText={errors.userId ? "Id field is required" : ""}
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
          <InputLabel style={{ color: "white", paddingRight: "320px" }}>
            Password:
          </InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            type="number"
            rules={{ required: true, minLength: 5, maxLength: 10 }}
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                {...field}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? "Passwordd must be 5 to 10 characters long."
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            style={{
              color: "white",
              marginTop: "20px",
            }}
          >
            Login
          </Button>
          <br />
          {successMsg && <p>{successMsg}</p>}
          {errMsg && <p>{errMsg}</p>}
        </div>
      </form>
    </>
  );
};

export default UserLogin;
