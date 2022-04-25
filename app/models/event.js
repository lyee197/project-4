const mongoose = require('mongoose')
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
			type: String,
			required: true,
			
		},
		attendies: {
			type: [petSchema]
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Event', eventSchema)
