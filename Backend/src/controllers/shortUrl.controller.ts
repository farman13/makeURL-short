import { shortUrl } from "../models/shortUrl.model.js";
import { Request, Response } from "express";
import { getShortUrl } from "../utils/getShortUrl.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


export const createURL = async (req: Request, res: Response) => {

    try {
        const originalURL = req.body.url;
        const shorturl = getShortUrl(7)
        await shortUrl.create({
            originalURL: originalURL,
            shortURL: shorturl
        })
        res.status(201).json(
            new ApiResponse(201, shorturl, "Short URL created")
        );
    } catch (error) {
        const err = error instanceof ApiError ? error : new ApiError(500, "Internal Server Error", [error]);
        res.status(err.statusCode).json(err);
    }

}

export const redirectURL = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const url = await shortUrl.findOneAndUpdate({ shortURL: id }, { $inc: { click: 1 } });

        if (!url) {
            throw new ApiError(404, "Short URL not found");
        }

        res.redirect(url.originalURL);
    } catch (error) {
        const err = error instanceof ApiError ? error : new ApiError(500, "Internal Server Error", [error]);
        res.status(err.statusCode).json(err);
    }
}