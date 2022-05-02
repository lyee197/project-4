const mongoose = require('mongoose')
const commentSchema = require('./comment')
const petSchema = require('./pet')

const eventSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		event_type: {
			// the condition is going to be a type: string
			type: String,
        	// but we'll use enum, so that we can get a few specific answers, and nothing else
        	// enum is a validator on the type String, that says "you can only use the values that live in this array"
			enum: ['public', 'private'],
			default:"public",
			required: true,
		},
		attendies: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Pet'
		}],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		comments: [commentSchema]	
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Event', eventSchema)
