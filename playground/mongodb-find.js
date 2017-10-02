const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err)
        return console.log("Error connecting to MongoDB server");

    console.log("Connected to MongoDB server");

    //db.collection("Todos").find({
    //    _id: new ObjectID("59cfc2aea6fd813264033a9f")
    //}).toArray().then((docs) => {
    //    console.log("Todos");
    //    console.log(JSON.stringify(docs, undefined, 2));
    //}, (err) => {
    //    console.log("ERROR: Unable to fetch Todos", err);
    //});

    db.collection("Users").find({name:"Emanuele"}).toArray().then((docs) => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("ERROR: Unable to fetch Todos", err);
    });

    db.close();
});