const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        author: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
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