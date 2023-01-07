import { React, useState } from "react";
import "../CSS/Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import logo from "../../../Images/RememberUs-Logo.png";
import { Link, useNavigate } from "react-router-dom"; //link to nevigate to spesic router from html and useNevigate to nevigate from code to another router from spesific
import axios from "axios";

const Login = (props) => {
    let navigate = useNavigate();

    const [isValidUserName, setIsValidUserName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [needErrorMsg, setNeedErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [enteredUserName, setEnteredUserName] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const UserNameChangeHandler = (event) => {
        setIsValidUserName(true);
        setIsValidPassword(true);
        setEnteredUserName(event.target.value);
    };
    const PasswordChangeHandler = (event) => {
        setIsValidUserName(true);
        setIsValidPassword(true);
        setEnteredPassword(event.target.value);
    };

    const LoginHandler = (event) => {
        event.preventDefault();
        setNeedErrorMsg(false);
        axios
            .post(`http://localhost:4000/api/v1/User/Login`, {
                userName: enteredUserName,
                password: enteredPassword,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (res.data.Status === "Login succssed") {
                    //nevigate will go back to app and search for the router
                    props.onLoggedUser(res.data.userInfo);
                    navigate("/userHomePage", {
                        replace: true,
                    });
                } else {
                    setNeedErrorMsg(true);
                    setErrorMsg(res.data.Reason);
                    setIsValidPassword(false);
                    setIsValidUserName(false);
                }
            });
    };

    return (
        <form className="form-Login">
            <div>
                <img src={logo} alt="Logo" className="Logo" />
            </div>
            <div>
                <div>
                    <TextField
                        className={isValidUserName ? "valid" : "invalid"}
                        label="Username"
                        value={enteredUserName}
                        onChange={UserNameChangeHandler}
                    />
                </div>
                <div>
                    <TextField
                        className={isValidPassword ? "valid" : "invalid"}
                        label="Password"
                        value={enteredPassword}
                        type="password"
                        onChange={PasswordChangeHandler}
                    />
                </div>
            </div>
            <div className="space"></div>
            <div>
                <Link to="/SignUp" style={{ textDecoration: "none" }}>
                    {<Button variant="contained">Sign-up</Button>}
                </Link>
                <Button variant="contained" onClick={LoginHandler}>
                    Log-in
                </Button>
            </div>
            <div>
                {needErrorMsg ? (
                    <Alert severity="error">{errorMsg}</Alert>
                ) : null}
            </div>
        </form>
    );
};

export default Login;
