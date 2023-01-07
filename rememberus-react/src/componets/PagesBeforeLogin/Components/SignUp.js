import { React, useState } from "react";
import "../CSS/SignUp.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logo from "../../../Images/RememberUs-Logo.png";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const currencies1 = ["Male", "Female"];
const currencies2 = ["True", "False"];

const SignUp = (props) => {
    let navigate = useNavigate();
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName] = useState(true);
    const [isValidUserName, setIsValidUserName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidGender, setIsValidGender] = useState(true);
    const [isValidAdress, setIsValidAdress] = useState(true);
    const [isValidPrivacy, setIsValidPrivacy] = useState(true);
    const [needErrorMsg, setNeedErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [enteredGender, setEnteredGender] = useState("");
    const GenderChangeHandler = (event) => {
        if (enteredFirstName.trim().length === 0) {
            setIsValidGender(true);
        }
        setEnteredGender(event.target.value);
    };

    const [enteredFirstName, setEnteredFirstName] = useState("");
    const FirstNameChangeHandler = (event) => {
        if (enteredFirstName.trim().length === 0) {
            setIsValidFirstName(true);
        }
        setEnteredFirstName(event.target.value);
    };

    const [enteredLastName, setEnteredLastName] = useState("");
    const LastNameChangeHandler = (event) => {
        if (enteredLastName.trim().length === 0) {
            setIsValidLastName(true);
        }
        setEnteredLastName(event.target.value);
    };

    const [enteredUserName, setEnteredUserName] = useState("");
    const UserNameChangeHandler = (event) => {
        if (enteredUserName.trim().length === 0) {
            setIsValidUserName(true);
        }
        setEnteredUserName(event.target.value);
    };

    const [enteredPassword, setEnteredPassword] = useState("");
    const PasswordChangeHandler = (event) => {
        if (enteredPassword.trim().length === 0) {
            setIsValidPassword(true);
        }
        setEnteredPassword(event.target.value);
    };

    const [enteredEmail, setEnteredEmail] = useState("");
    const EmailChangeHandler = (event) => {
        if (enteredEmail.trim().length === 0) {
            setIsValidEmail(true);
        }
        setEnteredEmail(event.target.value);
    };

    const [enteredAdress, setEnteredAdress] = useState("");
    const AdressChangeHandler = (event) => {
        if (enteredAdress.trim().length === 0) {
            setIsValidAdress(true);
        }
        setEnteredAdress(event.target.value);
    };

    const [enteredPrivacy, setEnteredPrivacy] = useState("");
    const PrivacyChangeHandler = (event) => {
        if (enteredAdress.trim().length === 0) {
            setIsValidPrivacy(true);
        }
        setEnteredPrivacy(event.target.value);
    };

    const SignUpHandler = (event) => {
        event.preventDefault();
        setNeedErrorMsg(false);
        if (enteredUserName.trim().length === 0) {
            setIsValidUserName(false);
        }
        if (enteredPassword.trim().length === 0) {
            setIsValidPassword(false);
        }
        if (enteredFirstName.trim().length === 0) {
            setIsValidFirstName(false);
        }
        if (enteredLastName.trim().length === 0) {
            setIsValidLastName(false);
        }
        if (enteredEmail.trim().length === 0) {
            setIsValidEmail(false);
        }
        if (enteredAdress.trim().length === 0) {
            setIsValidAdress(false);
        }
        if (enteredGender.trim().length === 0) {
            setIsValidGender(false);
        }
        if (enteredPrivacy.trim().length === 0) {
            setIsValidPrivacy(false);
        }
        axios
            .post(`http://localhost:4000/api/v1/User/SignUp`, {
                firstName: enteredFirstName,
                lastName: enteredLastName,
                userName: enteredUserName,
                password: enteredPassword,
                email: enteredEmail,
                adress: enteredAdress,
                gender: enteredGender,
                personPrivacy: enteredPrivacy,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (res.data.Status === "Sign Up succssed") {
                    setNeedErrorMsg(true);
                    setErrorMsg(
                        "Sign Up succssed, you can go back to login page in order to Login"
                    );
                } else {
                    setNeedErrorMsg(true);
                    setErrorMsg(res.data.Reason);
                }
            });
    };

    return (
        <div className="form-SignUp">
            <div className="Logo">
                <img src={logo} alt="Logo" className="Logo" />
            </div>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        className={isValidFirstName ? "valid" : "invalid"}
                        id="outlined-required-First-Name"
                        label="First Name"
                        value={enteredFirstName}
                        onChange={FirstNameChangeHandler}
                    />
                    <TextField
                        required
                        className={isValidLastName ? "valid" : "invalid"}
                        key="Last Name"
                        id="outlined-required-Last-Name"
                        label="Last Name"
                        value={enteredLastName}
                        onChange={LastNameChangeHandler}
                    />
                    <TextField
                        required
                        className={isValidUserName ? "valid" : "invalid"}
                        key="Username"
                        id="outlined-required-Username"
                        label="Username"
                        value={enteredUserName}
                        onChange={UserNameChangeHandler}
                    />
                    <TextField
                        required
                        className={isValidPassword ? "valid" : "invalid"}
                        key="Password"
                        id="outlined-password-input-Password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={enteredPassword}
                        onChange={PasswordChangeHandler}
                    />
                    <TextField
                        required
                        className={isValidEmail ? "valid" : "invalid"}
                        id="outlined-required"
                        label="Email"
                        value={enteredEmail}
                        onChange={EmailChangeHandler}
                    />
                    <TextField
                        required
                        className={isValidAdress ? "valid" : "invalid"}
                        id="outlined-required"
                        label="Adress"
                        value={enteredAdress}
                        onChange={AdressChangeHandler}
                    />
                    <TextField
                        className={isValidGender ? "valid" : "invalid"}
                        id="outlined-select-currency"
                        required
                        select
                        label="Gender"
                        value={enteredGender}
                        onChange={GenderChangeHandler}
                    >
                        {currencies1.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className={isValidPrivacy ? "valid" : "invalid"}
                        required
                        select
                        label="Privacy"
                        value={enteredPrivacy}
                        onChange={PrivacyChangeHandler}
                    >
                        {currencies2.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Box>
            <div>
                {needErrorMsg ? (
                    <Alert severity="error">{errorMsg}</Alert>
                ) : null}
            </div>
            <div>
                <Button variant="contained" onClick={SignUpHandler}>
                    Sign-up
                </Button>
                <Link to="/Login" style={{ textDecoration: "none" }}>
                    {<Button variant="contained">Back to Login page</Button>}
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
