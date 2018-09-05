const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose
	.connect(
		`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
			process.env.DB_HOSTNAME
		}:${process.env.DB_NAME}`
	)
	.then(console.log('MongoDB Connected'));

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
