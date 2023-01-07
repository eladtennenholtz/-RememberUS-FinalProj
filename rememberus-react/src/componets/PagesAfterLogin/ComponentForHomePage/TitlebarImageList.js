import { React, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import ImageUploading from "react-images-uploading";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "reactjs-popup";
import RadioControl from "./RadioControl.js";
import "reactjs-popup/dist/index.css";
import "./TitlebarImageList.css";
import axios from "axios";

const TitlebarImageList = (props) => {
  const [furnitureImages, setfurnitureImages] = useState(
    props?.userInfo?.forPlanArray[0]?.furnitureArray || []
  );
  //פונקציה בעת לחיצה על כפתור הוספת תמונה אמיתית של רהיט
  const onChangefurnitureImages = (newfurnitureImage) => {
    if (props?.userInfo?.forPlanArray.length !== 0) {
      //newfurnitureImage is array of the new furnitures array to send to the server
      let temp = {
        imageInBase64:
          newfurnitureImage[newfurnitureImage.length - 1].imageInBase64,
        key: furnitureImages.length + 1,
        file: newfurnitureImage[newfurnitureImage.length - 1].file,
        typeName: undefined,
        flag: true,
      };
      console.log(temp.imageInBase64);
      axios
        .post(
          `http://localhost:4000/api/v1/python/send_photo_to_python_server`,
          {
            base64: temp.imageInBase64,
          }
        )
        .then((res) => {
          temp.typeName = res.data.type;
          newfurnitureImage.pop();
          newfurnitureImage.push(temp);
          axios
            .post(
              `http://localhost:4000/api/v1/User/EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername`,
              {
                userName: props.userInfo.userName,
                floorPlanIndex: 0,
                newFurnituresArray: newfurnitureImage,
              }
            )
            .then((res) => {
              props.changeUserInfo(res.data.userInfo);
              setfurnitureImages(newfurnitureImage);
            });
        });
    } else {
      alert("First of all, you need to upload a floorplan");
    }

    // temp.typeName = "sofa"; //send requst to pythonServerRouter.get("/send_photo_to_python_server" and get furniture

    //לשלוח את newfurnitureImage

    // axios
    //   .post(
    //     `http://localhost:4000/api/v1/User/EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername`,
    //     {
    //       userName: props.userInfo.userName,
    //       floorPlanIndex: 0,
    //       newFurnituresArray: newfurnitureImage,
    //     }
    //   )
    //   .then((res) => {
    //     if (res.data.Status === "Delete furniture succssed") {
    //       props.changeUserInfo(res.data.userInfo);
    //     }
    //   });
  };

  const RemoveAllImages = () => {
    //remove the furniture array from the server
    axios
      .post(
        `http://localhost:4000/api/v1/User/DeleteAllFurnitureByCertainUsernameAnfFloorPlanIndex`,
        {
          userName: props.userInfo.userName,
          floorPlanIndex: 0,
        }
      )
      .then((res) => {
        if (res.data.Status === "Delete all furniture succssed") {
          props.changeUserInfo(res.data.userInfo);
          setfurnitureImages([]);
        }
      });
  };

  const RemoveImage = (key) => {
    let filtered = furnitureImages.filter(function (value) {
      return value.key !== key;
    });
    //remove specific image from array לשלוח מערך flirted להדביק
    axios
      .post(
        `http://localhost:4000/api/v1/User/EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername`,
        {
          userName: props.userInfo.userName,
          floorPlanIndex: 0,
          newFurnituresArray: filtered,
        }
      )
      .then((res) => {
        if (res.data.Status === "Delete furniture succssed") {
          props.changeUserInfo(res.data.userInfo);
          setfurnitureImages(filtered);
        }
      });
  };

  const ShowImage = (key) => {
    const newArr = furnitureImages.map((obj) => {
      if (obj.key === key && obj.file) {
        return { ...obj, flag: !obj.flag };
      }
      return obj;
    });
    setfurnitureImages(newArr);
  };

  const updateFurnitureWithoutImage = (furnitureValue) => {
    let temp = {
      imageInBase64: require(`../../../Images/furnituresImages/${furnitureValue}.jpg`),
      key: furnitureImages.length + 1,
      file: false,
      typeName: furnitureValue,
      flag: false,
    };
    const newfurnitureArr = [...furnitureImages, temp];

    axios
      .post(
        `http://localhost:4000/api/v1/User/EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername`,
        {
          userName: props.userInfo.userName,
          floorPlanIndex: 0,
          newFurnituresArray: newfurnitureArr,
        }
      )
      .then((res) => {
        if (res.data.Status === "Delete furniture succssed") {
          props.changeUserInfo(res.data.userInfo);
          setfurnitureImages(newfurnitureArr);
        }
      });
  };
  return (
    <div>
      <ImageList className="image-list">
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">
            You got {furnitureImages.length} Furnitures
          </ListSubheader>
          {furnitureImages.map((item) => (
            <ImageListItem key={item.imageInBase64}>
              <img
                src={
                  item.flag && item.file
                    ? require(`../../../Images/furnituresImages/${item.typeName}.jpg`)
                    : `${item.imageInBase64}`
                }
                alt={item.typeName}
                loading="lazy"
                onClick={() => {
                  ShowImage(item.key);
                }}
              />
              <ImageListItemBar
                title={
                  item.flag && item.file
                    ? `Click to see the original ${item.typeName}`
                    : `${item.typeName}`
                }
                actionIcon={
                  <IconButton
                    sx={{
                      color: "rgba(255, 255, 255, 0.54)",
                    }}
                    onClick={() => {
                      RemoveImage(item.key);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageListItem>
      </ImageList>
      <ImageUploading
        id="img-upl"
        value={furnitureImages}
        onChange={onChangefurnitureImages}
        dataURLKey="imageInBase64"
        multiple
      >
        {({ onImageUpload }) => (
          <div className="btn-UploadRemove">
            <Button onClick={onImageUpload}>Upload furniture image</Button>
            &nbsp;
            {furnitureImages.length !== 0 ? (
              <Button onClick={RemoveAllImages}>Remove all images</Button>
            ) : undefined}
            <Popup
              trigger={
                <Button className="uploadWithoutImage">Upload furniture</Button>
              }
              position="top center"
            >
              <RadioControl addFurnitureHandler={updateFurnitureWithoutImage} />
            </Popup>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default TitlebarImageList;
