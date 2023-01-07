import React, { useState } from "react";
import "./LikeAndComment.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const LikeAndComment = (props) => {
  //props.userInfo === logged user
  //props.user === user that we clicked done
  //the states that can be changed in that function
  //props.changeUser ---> in order to change the clickUser info
  //props.changelistPubliUsers -->in order to change the publicuserList

  //------------------------------Like/Dislike Section-----------------------------------

  //function that get logged in user name and clickeduser document and check if loggedin username alreadyliked clicked user floorplan
  const isLoggedInUserLikedClickUserFloorplan = (
    LoggedInUserName,
    clickedUser
  ) => {
    if (clickedUser.forPlanArray.length === 0) {
      //clicked user have no florrplan -> logged in user didnt liked user floorplan
      return false;
    }
    //clicked user got forplan
    else {
      let LoggedInUserAlreadyLiked = false;
      let clickedUserLikedArray = clickedUser.forPlanArray[0].likes;
      for (let likeUserName of clickedUserLikedArray) {
        if (likeUserName === LoggedInUserName) {
          LoggedInUserAlreadyLiked = true;
          break;
        }
      }
      if (LoggedInUserAlreadyLiked === false) {
        //logged in user didnt liked clicked user floorplan
        return false;
      } //logged in user liked clicked user floorplan
      else {
        return true;
      }
    }
  };

  //init Amount of likes of clicked user
  const [amountOfLikes, setamountOfLikes] = useState(
    props?.user?.forPlanArray[0]?.likes.length || 0
  );

  //init the likeClicked
  //if loggedinUser already like clicked user flotrplan->true
  //if loggedinUser didnt like clicked user flotrplan->false
  const [likeClicked, setIsClicked] = useState(
    isLoggedInUserLikedClickUserFloorplan(props.userInfo.userName, props.user)
  );

  const LikeClick = () => {
    //Logged in user Already like the cllick user floorplan -->logged in user clicked Dislike
    if (likeClicked === true) {
      axios
        .post(`http://localhost:4000/api/v1/User/Dislike`, {
          userNameThatAskToDislike: props.userInfo.userName,
          userNameThatWeWantToDislike: props.user.userName,
          floorPlanIndex: 0,
        })
        .then((res) => {
          if (res.data.Status === "Dislike succssed") {
            alert("Dislike succssed");
            //in order to change amount of like in modal window (not neccesary beacuse we set user so the component will reload)
            setamountOfLikes(amountOfLikes - 1);
            //in order to set new Clicked user beacuse we add like to his likes array so we want the userPublicPage component to reload
            props.changeUser(res.data.personWhoGotDislikeInfo);
            //set publicuser array in order to reload component of userHomePage with the new publicUserList to show the new amount of like in the userPublicPage
            axios
              .get(`http://localhost:4000/api/v1/User/BringAllPublicUser`)
              .then((res) => {
                let id = 1;
                res.data.publicUsersArray.forEach((element) => {
                  element["id"] = id++;
                  if (element.forPlanArray.length !== 0) {
                    element["likes"] = element.forPlanArray[0].likes.length;
                  }
                  props.changelistPubliUsers(res.data.publicUsersArray);
                });
              });
          }
        });
    }
    //Logged in user didnt like the cllick user floorplan -->logged in user clicked Like
    else {
      axios
        .post(`http://localhost:4000/api/v1/User/Like`, {
          userNameThatAskToLike: props.userInfo.userName,
          userNameThatWeWantToLike: props.user.userName,
          floorPlanIndex: 0,
        })
        .then((res) => {
          if (res.data.Status === "Like succssed") {
            alert("Like succssed");
            //in order to change amount of like in modal window (not neccesary beacuse we set user so the component will reload)
            setamountOfLikes(amountOfLikes + 1);
            //in order to set new Clicked user beacuse we add like to his likes array so we want the userPublicPage component to reload
            props.changeUser(res.data.personWhoGotLikeInfo);

            //set publicuser array in order to reload component of userHomePage with the new publicUserList to show the new amount of like in the userPublicPage
            axios
              .get(`http://localhost:4000/api/v1/User/BringAllPublicUser`)
              .then((res) => {
                let id = 1;
                res.data.publicUsersArray.forEach((element) => {
                  element["id"] = id++;
                  if (element.forPlanArray.length !== 0) {
                    element["likes"] = element.forPlanArray[0].likes.length;
                  }
                  props.changelistPubliUsers(res.data.publicUsersArray);
                });
              });
          }
        });
    }
    setIsClicked(!likeClicked);
  };

  //------------------------------Comment Section Section-----------------------------------
  //init the current comment Text
  const [enterdComment, setEnterdComment] = useState("");

  //in order to show the comment in live
  const CommentChangeHandler = (event) => {
    setEnterdComment(event.target.value);
  };

  //when comment button clicked
  const CommentClick = () => {
    props.changeComments([
      ...props.comments,
      {
        theUserNameWhoComment: props.userInfo.userName,
        theComment: enterdComment,
      },
    ]);
    setEnterdComment("");
    axios
      .post(`http://localhost:4000/api/v1/User/Comment`, {
        userNameThatAskToComment: props.userInfo.userName,
        theComment: enterdComment,
        userNameThatWeWantToComment: props.user.userName,
        floorPlanIndex: 0,
      })
      .then((res) => {
        if (res.data.Status === "Comment succssed") {
          alert("Comment Succssed");
          //set current comment to ""

          //in order to set new Clicked user beacuse we add like to his likes array so we want the userPublicPage component to reload
          props.changeUser(res.data.personWhoGotNewComment);
          //set publicuser array in order to reload component of userHomePage with the new publicUserList to show the new amount of like in the userPublicPage
          axios
            .get(`http://localhost:4000/api/v1/User/BringAllPublicUser`)
            .then((res) => {
              let id = 1;
              res.data.publicUsersArray.forEach((element) => {
                element["id"] = id++;
                if (element.forPlanArray.length !== 0) {
                  element["likes"] = element.forPlanArray[0].likes.length;
                }
                props.changelistPubliUsers(res.data.publicUsersArray);
              });
            });
        }
      });
  };

  return (
    <div className="continerOfLikeAndComment">
      <h4 className="title-like">
        {`${props.user.firstName} ${props.user.lastName} has ${amountOfLikes} likes`}
      </h4>
      <Button className="like-button" onClick={LikeClick}>
        <span className="likes-counter">{likeClicked ? `unlike` : `like`}</span>
      </Button>
      <TextField
        id="outlined-basic"
        label="Your Comment"
        variant="outlined"
        value={enterdComment}
        onChange={CommentChangeHandler}
      />
      <Button className="comment-button" onClick={CommentClick}>
        <span>Send</span>
      </Button>
    </div>
  );
};

export default LikeAndComment;
