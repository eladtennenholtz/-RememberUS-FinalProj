import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./UserEditPage.css";
import "./background-style.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const privacy = ["True", "False"];
const genders = ["Male", "Female"];

const UserEditPage = (props) => {
    const [newFirstName, setNewFirstName] = useState(props.userInfo.firstName);
    const [newLastName, setNewLastName] = useState(props.userInfo.lastName);
    const [newUserName, setNewUserName] = useState(props.userInfo.userName);
    const [newPassword, setNewPassword] = useState(props.userInfo.password);
    const [newEmail, setNewEmail] = useState(props.userInfo.email);
    const [newAdress, setNewAdress] = useState(props.userInfo.adress);
    const [newGender, setNewGender] = useState(props.userInfo.gender);
    const [newPersonPrivacy, setNewUserPersonPrivacy] = useState(
        props.userInfo.personPrivacy
    );
    const [needErrorMsg, setNeedErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setNeedErrorMsg(false);
        e.preventDefault();
        switch (e.target.name) {
            case "firstName": {
                setNewFirstName(e.target.value);
                break;
            }
            case "lastName": {
                setNewLastName(e.target.value);
                break;
            }
            case "userName": {
                setNewUserName(e.target.value);
                break;
            }
            case "password": {
                setNewPassword(e.target.value);
                break;
            }
            case "email": {
                setNewEmail(e.target.value);
                break;
            }
            case "address": {
                setNewAdress(e.target.value);
                break;
            }
        }
    };

    const PrivacyChange = (e) => {
        e.preventDefault();
        setNewUserPersonPrivacy(e.target.value);
    };

    const GenderChange = (e) => {
        e.preventDefault();
        setNewGender(e.target.value);
    };

    const ChangeDetailsHandler = () => {
        const newUserDetails = {
            firstName: newFirstName,
            lastName: newLastName,
            userName: newUserName,
            password: newPassword,
            email: newEmail,
            adress: newAdress,
            gender: newGender,
            personPrivacy: newPersonPrivacy,
        };
        axios
            .post(`http://localhost:4000/api/v1/User/EditUserDetails`, {
                userName: props.userInfo.userName,
                newUser: newUserDetails,
            })
            .then((res) => {
                if (res.data.Status === "Edit succssed") {
                    props.changeUserInfo(res.data.userInfo);
                    props.nonePrivatePage(true);
                    props.noneEditPage(false);
                } else {
                    setErrorMsg(res.data.Reason);
                    setNeedErrorMsg(true);
                }
            });
    };
    return (
        <div className={props.display ? "continer" : "display-none"}>
            <Box className="edit-Form">
                <TextField
                    className="detaile"
                    placeholder="firstname"
                    label="firstName"
                    name="firstName"
                    onChange={handleChange}
                    defaultValue={newFirstName}
                />
                <TextField
                    className="detaile"
                    placeholder="lastname"
                    label="lastName"
                    name="lastName"
                    onChange={handleChange}
                    defaultValue={newLastName}
                />
                <TextField
                    className="detaile"
                    placeholder="username"
                    label="userName"
                    name="userName"
                    onChange={handleChange}
                    defaultValue={newUserName}
                />
                <TextField
                    className="detaile"
                    placeholder="password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    defaultValue={newPassword}
                />
                <TextField
                    className="detaile"
                    placeholder="email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    defaultValue={newEmail}
                />
                <TextField
                    className="detaile"
                    placeholder="address"
                    name="address"
                    label="Adress"
                    onChange={handleChange}
                    defaultValue={newAdress}
                />
                <TextField
                    className="detaile"
                    id="select"
                    select
                    label="Gender"
                    value={newGender}
                    onChange={GenderChange}
                >
                    {genders.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    className="detaile"
                    id="select"
                    select
                    label="Privacy"
                    value={newPersonPrivacy}
                    onChange={PrivacyChange}
                >
                    {privacy.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    className="ConfirmEdit-But"
                    variant="contained"
                    onClick={ChangeDetailsHandler}
                >
                    Change Details
                </Button>
            </Box>
            <div>
                {needErrorMsg ? (
                    <Alert severity="error">{errorMsg}</Alert>
                ) : null}
            </div>
        </div>
    );
};
export default UserEditPage;
