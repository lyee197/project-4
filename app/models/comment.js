const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        owner: {
			type: String,
		},
        comment: {
            type: String,
            required: true,
        }
    },
    {
		timestamps: true,
	}
)

module.exports = commentSchema