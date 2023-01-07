`use strict`;

//MongoDB
const { MongoClient } = require("mongodb");
const uriForDatabase =
    "mongodb+srv://omeridan123:!!!!!!!!!1@cluster0.we1ph.mongodb.net/?retryWrites=true&w=majority"; //our uri for connection the cluster
const client = new MongoClient(uriForDatabase); //our Connection to data base object

//function for connecting to data base
async function ConnectToDataBase() {
    try {
        console.log("Connecting To database...");
        await client.connect();
        console.log("Connecting To database succssed");
    } catch (e) {
        console.log("Error connecting to Data base");
        console.log(e);
    }
}

//function that get userName and password and check if there is document including that info
async function IsuserNameAndpasswordExist(userName, password) {
    const userDocument = await client
        .db("RememberUs-DataBase")
        .collection("signedUsers")
        .findOne({ userName: userName, password: password });
    return userDocument;
}

//function that get userName check if there is document including that info
async function IsuserNameExist(userName) {
    const userDocument = await client
        .db("RememberUs-DataBase")
        .collection("signedUsers")
        .findOne({ userName: userName });
    return userDocument;
}

//Function that get Newperson that not exist in data base and create new document for him
async function CreateNewPersonInDataBase(NewPerson) {
    const newAddedUser = await client
        .db("RememberUs-DataBase")
        .collection("signedUsers")
        .insertOne(NewPerson);
}

//Function that delete exist person from DataBase
async function DeleteExistPersonFromDB(userName) {
    const result = await client
        .db("RememberUs-DataBase")
        .collection("signedUsers")
        .deleteOne({ userName: userName });
}

//function that update forPlanImage for existing user in data base
async function CreateNewfloorPlanForExistUser(userName, forPlanImageInBase64) {
    const userDocument = await client
        .db("RememberUs-DataBase")
        .collection("signedUsers")
        .findOne({ userName: userName });

    const updateFields = { forPlanImageInBase64: forPlanImageInBase64 };

    const result = await client
        .db("RememberUs-DataBase") //Name of data base
        .collection("signedUsers") //name of collection
        .updateOne({ userName: userName }, { $set: updateFields }); //Document with name=name will update the field updatefields

    await ClosingConnectionWithDataBase();
}

//function that update password for existing user in data base
async function changePasswordForExistuser(userName, newPassword) {
    const updateFields = { password: newPassword };

    const result = await client
        .db("RememberUs-DataBase") //Name of data base
        .collection("signedUsers") //name of collection
        .updateOne({ userName: userName }, { $set: updateFields }); //Document with name=name will update the field updatefields
}

//Function that return all documents from signedUser DataBase
async function GetAllDocumentsFromsignedUsersCollection() {
    const documents = await client
        .db("RememberUs-DataBase")
        .collection("signedUsers")
        .find({ personPrivacy: "False" });
    const documentsArray = await documents.toArray();
    return documentsArray;
}

module.exports = {
    GetAllDocumentsFromsignedUsersCollection:
        GetAllDocumentsFromsignedUsersCollection,

    ConnectToDataBase: ConnectToDataBase,
    IsuserNameAndpasswordExist: IsuserNameAndpasswordExist,
    IsuserNameExist: IsuserNameExist,
    CreateNewPersonInDataBase: CreateNewPersonInDataBase,
    DeleteExistPersonFromDB: DeleteExistPersonFromDB,
    changePasswordForExistuser: changePasswordForExistuser,
};
