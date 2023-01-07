import { React, useState } from "react";
import "./background-style.css";
import UsersList from "./ComponentForHomePage/UsersList.js";
import PublicModal from "./ComponentForHomePage/PublicModal";

const UserPublicPage = (props) => {
  const [commentArray, setCommentArray] = useState([]);
  const [user, setUser] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openModelWithUser = (userFromList) => {
    if (userFromList.forPlanArray.length !== 0) {
      handleOpen();
      setUser(userFromList);
      setCommentArray(userFromList.forPlanArray[0].comments);
    } else {
      alert("You chose a user who did not upload a floorplan");
    }
  };
  return (
    <div className={props.display ? "continer" : "display-none"}>
      <UsersList
        onClickUser={openModelWithUser}
        listPublicUsers={props.listPublicUsers}
      ></UsersList>
      <PublicModal
        open={open}
        handelOpen={handleOpen}
        handleClose={handleClose}
        user={user}
        userInfo={props.userInfo}
        changeUser={setUser}
        changelistPubliUsers={props.changelistPubliUsers}
        setComment={setCommentArray}
        comments={commentArray}
      ></PublicModal>
    </div>
  );
};

export default UserPublicPage;
