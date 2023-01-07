import { React, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import "./TitleBarPublic.css";

const TitleBarPublic = (props) => {
  const [furnitureImages, setfurnitureImages] = useState(
    props?.userInfo?.forPlanArray[0]?.furnitureArray || []
  );

  return (
    <ImageList className="image-list-public">
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          {furnitureImages.length} furnitures
        </ListSubheader>
        {furnitureImages.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.imageInBase64} alt={item.typeName} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageListItem>
    </ImageList>
  );
};

export default TitleBarPublic;
