import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    provider: {
        type: String,
    },
    sub: {
        type: String,
        unique: true
    }
})

export const User = model("User", userSchema)
