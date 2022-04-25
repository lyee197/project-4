const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
    {
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
        birthday: {
            type: Date,
            required: true,
        },
        animal_type: {
            type: String,
            required: true,
        }
    },
    {
		timestamps: true,
	}
)

module.exports = petSchema