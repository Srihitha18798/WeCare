import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [coach, setCoach] = useState();

  const handleUserLogin = (userData) => {
    setUser(userData);
  };
  const handleUserLogout = () => {
    setUser(null);
  };
  const handleCoachLogin = (coachData) => {
    setCoach(coachData);
  };
  const handleCoachLogout = () => {
    setCoach(null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        coach,
        handleUserLogin,
        handleUserLogout,
        handleCoachLogin,
        handleCoachLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
