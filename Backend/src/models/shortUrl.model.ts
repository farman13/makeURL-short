import { Schema, model, } from "mongoose";

const shortUrlSchema = new Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    click: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


export const shortUrl = model("shortURL", shortUrlSchema);
