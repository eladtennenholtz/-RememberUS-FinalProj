import { React, useState, useContext } from "react";
import "./UserPrivatePage.css";
import "./background-style.css";
import LoggedInUserInfo from "./ComponentForHomePage/LoggedInUserInfo";
import { Button } from "@mui/material";
import ImageUploading from "react-images-uploading";
import TitlebarImageList from "./ComponentForHomePage/TitlebarImageList";
import axios from "axios";

const UserPrivatePage = (props) => {
  const [floorPlanImage, setFloorPlanImage] = useState(
    props?.userInfo?.forPlanArray[0]?.forPlanImangeBase64 || []
  );
  const onChangeFoorPlan = async (newFloorPlanImage) => {
    if (newFloorPlanImage.length !== 0) {
      const res = await axios.post(
        `http://localhost:4000/api/v1/User/AddNewForPlanImage`,
        {
          userName: props.userInfo.userName,
          forPlanImageInBase64: newFloorPlanImage,
        }
      );
      props.changeUserInfo(res.data.info);
      setFloorPlanImage(newFloorPlanImage); //Show floorPlan
    } else if (props.userInfo.forPlanArray[0].furnitureArray.length === 0) {
      const res = await axios.post(
        `http://localhost:4000/api/v1/User/DeleteForPlanByIndex`,
        {
          userName: props.userInfo.userName,
          forPlanIndex: 0,
        }
      );
      props.changeUserInfo(res.data.info);
      setFloorPlanImage(newFloorPlanImage); //Show floorPlan
    } else {
      alert("First of all, please delete your all your furnitures");
    }
  };

  return (
    <div className={props.display ? "continer" : "display-none"}>
      <LoggedInUserInfo
        name={`${props.userInfo.lastName} ${props.userInfo.firstName}`}
        street={props.userInfo.adress}
        gender={props.userInfo.gender}
      />
      <div>
        <ImageUploading
          value={floorPlanImage}
          onChange={onChangeFoorPlan}
          dataURLKey="data_url"
        >
          {({ onImageUpload, onImageRemove }) => (
            <div>
              {floorPlanImage.length === 0 ? (
                <Button className="Uploadbtn" onClick={onImageUpload}>
                  Upload floor plan
                </Button>
              ) : undefined}
              {floorPlanImage.map((image, index) => (
                <div key={index} className="image-item">
                  <img
                    className="floorPlan"
                    src={image["data_url"]}
                    alt="floorPlanPhoto"
                  />
                  <div>
                    <Button
                      className="Removebtn"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <div className="Images-bar">
        <TitlebarImageList
          userInfo={props.userInfo}
          changeUserInfo={props.changeUserInfo}
        />
      </div>
    </div>
  );
};

export default UserPrivatePage;
