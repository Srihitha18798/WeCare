import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CoachHomeScreen from "./components/CoachHomeScreen";
import CoachLogin from "./components/CoachLogin";
import CoachSchedules from "./components/CoachSchedules";
import CoachSignUp from "./components/CoachSignUp";
import CoachViewProfile from "./components/CoachViewProfile";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserAppointments from "./components/UserAppointments";
import UserHomeScreen from "./components/UserHomeScreen";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import UserViewProfile from "./components/UserViewProfile";
import BookAppointment from "./components/BookAppointment";
import RescheduleAppointment from "./components/RescheduleAppointment";
import DeleteAppointment from "./components/DeleteAppointment";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Home" element={<Home />}></Route>
          <Route exact path="/CoachLogin" element={<CoachLogin />}></Route>
          <Route exact path="/UserLogin" element={<UserLogin />}></Route>
          <Route exact path="/CoachSignUp" element={<CoachSignUp />}></Route>
          <Route exact path="/UserSignUp" element={<UserSignUp />}></Route>
          <Route exact path="/Navbar" element={<Navbar />}></Route>
          <Route
            exact
            path="/CoachHomeScreen"
            element={<CoachHomeScreen />}
          ></Route>
          <Route
            exact
            path="/UserHomeScreen"
            element={<UserHomeScreen />}
          ></Route>
          <Route
            exact
            path="/CoachSchedules"
            element={<CoachSchedules />}
          ></Route>
          <Route
            exact
            path="/CoachViewProfile"
            element={<CoachViewProfile />}
          ></Route>
          <Route
            exact
            path="/UserAppointments"
            element={<UserAppointments />}
          ></Route>
          <Route
            exact
            path="/UserViewProfile"
            element={<UserViewProfile />}
          ></Route>
          <Route
            exact
            path="/BookAppointment"
            element={<BookAppointment />}
          ></Route>
          <Route
            exact
            path="/RescheduleAppointment"
            element={<RescheduleAppointment />}
          ></Route>
          <Route
            exact
            path="/DeleteAppointment"
            element={<DeleteAppointment />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
