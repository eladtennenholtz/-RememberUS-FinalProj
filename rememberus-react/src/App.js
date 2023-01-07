import { React, useState, createContext, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componets/PagesBeforeLogin/Components/Login";
import SignUp from "./componets/PagesBeforeLogin/Components/SignUp";
import Start from "./componets/PagesBeforeLogin/Components/Start";
import UserHomePage from "./componets/PagesAfterLogin/UserHomePage";

export const UserContext = createContext();

function App() {
  const [LoggedUser, setLoggedUser] = useState({});
  //in react for changing object during running we need to "latof" the change state function in that function
  const onLoggedUser = (userInfo) => {
    setLoggedUser((prev) => {
      return userInfo;
    });
  };
  return (
    <UserContext.Provider value={LoggedUser}>
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/img/backgroungFloorplan.png"
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Router>
          <Routes>
            <Route
              path="/userHomePage"
              element={
                <UserHomePage
                  userInfo={LoggedUser}
                  changeUserInfo={onLoggedUser}
                />
              }
            />
            <Route path="/" element={<Start />} />
            <Route
              path="/Login"
              element={<Login onLoggedUser={onLoggedUser} />}
            />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
