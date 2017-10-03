var mongoose = require('mongoose');
const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI);

module.exports = {mongoose};
