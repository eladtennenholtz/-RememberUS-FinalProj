import React from "react";
import "./LoggedInUserInfo.css";

const LoggedInUserInfo = (props) => {
    let userIsMale = false;
    if (props.gender === "Male") {
        userIsMale = true;
    }

    return (
        <div className="sectiontext">
            <h3>
                Hello, {userIsMale ? "Mr." : "Ms."} {props.name}
            </h3>
            <h3>Address: {props.street}</h3>
        </div>
    );
};

export default LoggedInUserInfo;
