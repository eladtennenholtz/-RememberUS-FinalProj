//in order to pass the router to the apiPath
const express = require("express");
const UserRouter = express.Router();
module.exports = UserRouter;
const path = require("path");

//Load Logic manager
const LogicManager = require(path.join(
  __dirname,
  "../../../Logic/LogicManager"
));

//when using /api/v1/User/Login (must send userName and password as parameters)
UserRouter.post("/Login", async (req, res) => {
  res.send(await LogicManager.Login(req.body.userName, req.body.password));
});

//when using /api/v1/User/SignUp (must send userName, password, email and adress as parameters)
UserRouter.post("/SignUp", async (req, res) => {
  res.send(
    await LogicManager.SignUp(
      req.body.firstName,
      req.body.lastName,
      req.body.userName,
      req.body.password,
      req.body.email,
      req.body.adress,
      req.body.gender,
      req.body.personPrivacy
    )
  );
});

//when using /api/v1/User/Delete (must send userName)
UserRouter.post("/Delete", async (req, res) => {
  console.log(req.body);
  res.send(await LogicManager.DeletingAccount(req.body.userName));
});

//when using /api/v1/User/ChangePassword (must send userName,oldPassword and newPassword)
UserRouter.post("/ChangePassword", async (req, res) => {
  res.send(
    await LogicManager.ChangePassword(
      req.body.userName,
      req.body.oldPassword,
      req.body.newPassword
    )
  );
});

//Edit user Details
UserRouter.post("/EditUserDetails", async (req, res) => {
  res.send(await LogicManager.UpdateUser(req.body.userName, req.body.newUser));
});

////when using /api/v1/User/AddForPlanImage (must send userName and forplanimagebase64)
UserRouter.post("/AddNewForPlanImage", async (req, res) => {
  res.send(
    await LogicManager.addNewForPlanForExistUser(
      req.body.userName,
      req.body.forPlanImageInBase64
    )
  );
});

////when using /api/v1/User/DeleteForPlanByIndex (must send userName and and forPlan Index)
UserRouter.post("/DeleteForPlanByIndex", async (req, res) => {
  res.send(
    await LogicManager.DeleteForPlanByIndexForExistUser(
      req.body.userName,
      req.body.forPlanIndex
    )
  );
});

////when using /api/v1/User/AddOneFurniture (must send userName,ImageInBase64)
UserRouter.post("/AddOneFurnitureWithoutPhotoManually", async (req, res) => {
  res.send(
    await LogicManager.AddNewFurnitureManuallyWithoutPhotoToCertainIndexForPlanForCertainExistUser(
      req.body.userName,
      req.body.forPlanIndex,
      req.body.typeName
    )
  );
});

UserRouter.post("/AddOneFurnitureWithPhoto", async (req, res) => {
  res.send(
    await LogicManager.AddNewFurnitureWithPhotoToCertainIndexForPlanForCertainExistUser(
      req.body.userName,
      req.body.forPlanIndex,
      req.body.ImageInBase64
    )
  );
});

UserRouter.delete(
  "/DeleteFurnitureByIndexOfCertainFloorPlan",
  async (req, res) => {
    res.send(
      await LogicManager.DeleteFurnitureByIndexOfCertainIndexFloorplanForExistUser(
        req.body.userName,
        req.body.forPlanIndex,
        req.body.furnitureIndex
      )
    );
  }
);

UserRouter.post(
  "/ChangeTypeNameOfCertainFurnitureIndexForCertainFloorplanIndexOfExistUser",
  async (req, res) => {
    res.send(
      await LogicManager.ChangeFurnitureTypeByFurnitureIndexAndFloorPlanIndexOfExistUser(
        req.body.userName,
        req.body.forPlanIndex,
        req.body.furnitureIndex,
        req.body.newTypeName
      )
    );
  }
);

UserRouter.post("/UpdateDetail", async (req, res) => {
  res.send(
    await LogicManager.UpdateExistUserDetail(
      req.body.userName,
      req.body.updateField,
      req.body.updateData
    )
  );
});

UserRouter.post("/GiveAnotherPersonDocumentByHisPrivacy", async (req, res) => {
  res.send(await LogicManager.getPersonDocumentByHisPrivacy(req.body.userName));
});

UserRouter.post("/Like", async (req, res) => {
  res.send(
    await LogicManager.LikeFloorPlanByUserName(
      req.body.userNameThatAskToLike,
      req.body.userNameThatWeWantToLike,
      req.body.floorPlanIndex
    )
  );
});

UserRouter.post("/Dislike", async (req, res) => {
  res.send(
    await LogicManager.DislikeFloorPlanByUserName(
      req.body.userNameThatAskToDislike,
      req.body.userNameThatWeWantToDislike,
      req.body.floorPlanIndex
    )
  );
});

UserRouter.post("/Comment", async (req, res) => {
  res.send(
    await LogicManager.CommentFloorPlanByUserName(
      req.body.userNameThatAskToComment,
      req.body.theComment,
      req.body.userNameThatWeWantToComment,
      req.body.floorPlanIndex
    )
  );
});

UserRouter.get("/BringAllPublicUser", async (req, res) => {
  res.send(await LogicManager.GetAllPublicUsers());
});

UserRouter.post(
  "/DeleteAllFurnitureByCertainUsernameAnfFloorPlanIndex",
  async (req, res) => {
    res.send(
      await LogicManager.DeleteAllFurnituresOfCertainFloorPlanIndexForExistCertainUserName(
        req.body.userName,
        req.body.floorPlanIndex
      )
    );
  }
);

UserRouter.post(
  "/EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername",
  async (req, res) => {
    res.send(
      await LogicManager.EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername(
        req.body.userName,
        req.body.floorPlanIndex,
        req.body.newFurnituresArray
      )
    );
  }
);
