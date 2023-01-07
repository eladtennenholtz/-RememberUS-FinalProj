import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import "./TitleBarComment.css";

export default function TitleBarComment(props) {
  console.log(props.comments);
  return (
    <div className="comment-bar">
      <h2>Comments:</h2>
      <List>
        {props.comments.map((value) => (
          <ListItem key={value} disableGutters>
            <ListItemText
              primary={`${value.theComment}`}
              secondary={`${value.theUserNameWhoComment}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
