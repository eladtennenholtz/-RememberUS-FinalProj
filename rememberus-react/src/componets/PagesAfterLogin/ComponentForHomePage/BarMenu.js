import React from "react";
import "./BarMenu.css";
import logo from "../../../Images/RememberUs-Logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BarMenu = (props) => {
    let navigate = useNavigate();

    const onClickPrivatePage = () => {
        props.nonePrivatePage(true);
        props.nonePublicPage(false);
        props.noneEditPage(false);
    };
    const onClickPublicPage = () => {
        props.nonePublicPage(true);
        props.nonePrivatePage(false);
        props.noneEditPage(false);
        axios
            .get(`http://localhost:4000/api/v1/User/BringAllPublicUser`)
            .then((res) => {
                let id = 1;
                res.data.publicUsersArray.forEach((element) => {
                    element["id"] = id++;
                    if (element.forPlanArray.length !== 0) {
                        element["likes"] = element.forPlanArray[0].likes.length;
                    }
                    props.listPublicUsers(res.data.publicUsersArray);
                });
            });
    };
    const onClickEditPage = () => {
        props.nonePublicPage(false);
        props.noneEditPage(true);
        props.nonePrivatePage(false);
    };

    const deletingAccount = () => {
        props.nonePrivatePage(true);
        props.nonePublicPage(false);
        props.noneEditPage(false);
        axios
            .post(`http://localhost:4000/api/v1/User/Delete`, {
                userName: props.userInfo.userName,
            })
            .then((res) => {});
        navigate("/Login", {
            replace: true,
        });
    };

    return (
        <div className="nav-container">
            <div className="main-items">
                <div className="nav-item" onClick={onClickPrivatePage}>
                    My FloorPlan
                </div>
                <div className="nav-item" onClick={onClickPublicPage}>
                    Other FloorPlan
                </div>
                <div className="nav-item" onClick={onClickEditPage}>
                    Edit My Details
                </div>
                <div className="nav-item" onClick={deletingAccount}>
                    Delete My Account
                </div>
                <Link to="/Login" style={{ textDecoration: "none" }}>
                    {<div className="nav-item">Logout</div>}
                </Link>
            </div>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo-pic" />
            </div>
        </div>
    );
};

export default BarMenu;
