const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Blog = new schema({
	id: {
		type: String,
		unique: true
		
	},
	title: {
		type: String,
			},
	description: {
		type: String,
        },
	
}, {timestamps: true});
module.exports = mongoose.model('Blog', Blog);
