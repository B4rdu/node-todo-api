//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err)
        return console.log("Error connecting to MongoDB server");

    console.log("Connected to MongoDB server");

    //db.collection("Todos").insertOne({
    //    text: "Something to do",
    //    completed: false
    //}, (err, res) => {
    //    if (err)
    //        return console.log("ERROR: Unable to insert todo");

    //    console.log(JSON.stringify(res.ops,undefined,2));
    //    });

    // Insert new doc into Users (name,age,location)

    //db.collection("Users").insertOne({
    //    name: "Emanuele",
    //    age: 23,
    //    location: "Viale Europa 83 Siano"
    //}, (err, res) => {
    //    if (err)
    //        return console.log("ERROR: Unable to insert User");

    //    console.log(JSON.stringify(res.ops, undefined, 2));
    //    console.log(res.ops[0]._id.getTimestamp());
    //    });

    db.close();
});