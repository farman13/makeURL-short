import { shortUrl } from "../models/shortUrl.model.js";
import { getShortUrl } from "../utils/getShortUrl.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
export const createURL = async (req, res) => {
    console.log("Indisde create");
    try {
        const originalURL = req.body.url;
        const sub = req.body.sub;
        const customUrl = req.body.customUrl;
        const user = await User.findOne({ sub: sub });
        if (user && customUrl) {
            const shorturl = customUrl;
            await shortUrl.create({
                originalURL: originalURL,
                shortURL: shorturl,
                user: user._id
            });
            res.status(201).json(new ApiResponse(201, "http://localhost:8000/shorturl/" + shorturl, "Short URL created"));
        }
        else {
            console.log("insdie", originalURL);
            const shorturl = getShortUrl(7);
            await shortUrl.create({
                originalURL: originalURL,
                shortURL: shorturl,
                user: user?._id
            });
            res.status(201).json(new ApiResponse(201, "http://localhost:8000/shorturl/" + shorturl, "Short URL created"));
        }
    }
    catch (error) {
        const err = error instanceof ApiError ? error : new ApiError(500, "Internal Server Error", [error]);
        res.status(err.statusCode).json(err);
    }
};
export const redirectURL = async (req, res) => {
    try {
        const { id } = req.params;
        const url = await shortUrl.findOneAndUpdate({ shortURL: id }, { $inc: { click: 1 } });
        if (!url) {
            throw new ApiError(404, "Short URL not found");
        }
        res.redirect(url.originalURL);
    }
    catch (error) {
        const err = error instanceof ApiError ? error : new ApiError(500, "Internal Server Error", [error]);
        res.status(err.statusCode).json(err);
    }
};
