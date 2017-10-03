const _ = require("lodash");
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require("mongodb");

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const PORT = process.env.PORT || 3000;
const CODE_ERROR = 400;
const CODE_NOT_FOUND = 404;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((todo) => {
      res.send({ todo });
  }, (e) => {
      res.status(CODE_ERROR).send(e);
  });
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }).catch((e) => res.statusCode(CODE_ERROR).send(e));
});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(CODE_NOT_FOUND).send();

    Todo.findById(id).then((todo) => {
        if (todo)
            res.send({ todo });
        else
            res.status(CODE_NOT_FOUND).send();
    })
        .catch((e) => res.status(CODE_ERROR).send());
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(CODE_NOT_FOUND).send();

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo)
            res.send({ todo });
        else
            res.status(CODE_NOT_FOUND).send();
    })
        .catch((e) => res.status(CODE_ERROR).send());
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id))
        return res.status(CODE_NOT_FOUND).send();

    if (_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (todo)
            res.send({ todo });
        else
            res.status(CODE_NOT_FOUND).send();
    }).catch((e) => res.status(CODE_ERROR).send());
});

app.listen(PORT, () => {
    console.log('Started on port ' + PORT);
});

module.exports = {app};