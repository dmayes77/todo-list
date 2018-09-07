const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose
	.connect(process.env.MONGODB_URI)
	.then(console.log('MongoDB Connected'));

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
