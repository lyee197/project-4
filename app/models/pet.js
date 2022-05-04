const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true,
        },
        animalType: {
            // the condition is going to be a type: string
            type: String,
            // but we'll use enum, so that we can get a few specific answers, and nothing else
        	// enum is a validator on the type String, that says "you can only use the values that live in this array"
            enum: ['dog', 'cat', 'rodent', 'fish', 'bird', 'other'],
            default: "other",
            required: true,
        }
    },
    {
		timestamps: true,
	}
)

module.exports = petSchema