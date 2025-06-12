import { shortUrl } from "../models/shortUrl.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const signupUser = async (req, res) => {
    const { username, email, sub } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        res.status(409).json(new ApiResponse(409, "User already exists"));
        return;
    }
    await User.create({
        username, email, provider: "Google", sub
    });
    res.status(200).json(new ApiResponse(200, "user singup successfully"));
};
export const getUrls = async (req, res) => {
    const sub = req.body.sub;
    const user = await User.findOne({ sub: sub });
    if (!user) {
        res.status(400).json(new ApiResponse(504, "user not found"));
        return;
    }
    const allurls = await shortUrl.find({ user: user?._id });
    res.status(200).json(new ApiResponse(200, allurls, "URLs fetched successfully"));
};
