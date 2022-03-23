const mongoose = require("mongoose")

const model = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: false
    },
    todo: {
        type: Array,
        required: true,
    },
    completed: {
        tyep: String,
        default: false
    }
})

const User = mongoose.model("User", model)

module.exports = User