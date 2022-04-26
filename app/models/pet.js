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
            type: String,
            required: true,
        }
    },
    {
		timestamps: true,
	}
)

module.exports = mongoose.model('Pet', petSchema)