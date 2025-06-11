import { nanoid } from "nanoid"

export const getShortUrl = (length: number) => {
    return nanoid(length)
}