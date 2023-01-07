import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./PublicModal.css";
import TitleBarPublic from "./TitleBarPublic";
import LikeAndComment from "./LikeAndComment";
import TitleBarComment from "./TitleBarComment";

const PublicModal = (props) => {
  let srcPhoto =
    Object.keys(props.user).length === 0
      ? " "
      : props.user.forPlanArray.length === 0
      ? " "
      : props.user.forPlanArray[0].forPlanImangeBase64[0].data_url;

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box className="modal">
          <img className="img-model" src={srcPhoto} />
          <LikeAndComment
            user={props.user}
            userInfo={props.userInfo}
            changeUser={props.changeUser}
            changelistPubliUsers={props.changelistPubliUsers}
            changeComments={props.setComment}
            comments={props.comments}
          ></LikeAndComment>
          <TitleBarComment
            className="comments-models"
            userInfo={props.user}
            comments={props.comments}
          ></TitleBarComment>
          <TitleBarPublic
            className="bar-model"
            userInfo={props.user}
          ></TitleBarPublic>
        </Box>
      </Modal>
    </div>
  );
};

export default PublicModal;
