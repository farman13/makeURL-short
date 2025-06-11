import { nanoid } from "nanoid";
export const getShortUrl = (length) => {
    return nanoid(length);
};
