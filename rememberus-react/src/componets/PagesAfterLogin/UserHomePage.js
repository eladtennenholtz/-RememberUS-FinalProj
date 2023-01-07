import { React, useState } from "react";
import UserPrivatePage from "./UserPrivatePage";
import UserPublicPage from "./UserPublicPage";
import UserEditPage from "./UserEditPage";
import "./UserHomePage.css";
import { Link } from "react-router-dom";
import BarMenu from "./ComponentForHomePage/BarMenu";

const UserHomePage = (props) => {
  const [listPublicUsers, setListPublicUsers] = useState([]);
  const [privatePage, setPrivatePage] = useState(true);
  const [publicPage, setPublicPage] = useState(false);
  const [editPage, setEditPage] = useState(false);

  return (
    <div>
      <BarMenu
        nonePrivatePage={setPrivatePage}
        nonePublicPage={setPublicPage}
        noneEditPage={setEditPage}
        listPublicUsers={setListPublicUsers}
        userInfo={props.userInfo}
      ></BarMenu>
      <UserPrivatePage
        userInfo={props.userInfo}
        changeUserInfo={props.changeUserInfo}
        display={privatePage}
      ></UserPrivatePage>
      <UserPublicPage
        userInfo={props.userInfo}
        changeUserInfo={props.changeUserInfo}
        listPublicUsers={listPublicUsers}
        changelistPubliUsers={setListPublicUsers}
        display={publicPage}
      ></UserPublicPage>
      <UserEditPage
        userInfo={props.userInfo}
        changeUserInfo={props.changeUserInfo}
        display={editPage}
        nonePrivatePage={setPrivatePage}
        noneEditPage={setEditPage}
      ></UserEditPage>
    </div>
  );
};

export default UserHomePage;
