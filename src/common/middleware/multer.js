import ImageKit from "imagekit";
import multer from "multer";
import {env} from "../../../config/env.service.js"

const storage = multer.memoryStorage()
export const upload = multer({storage})


export const imageKit = new ImageKit({
    publicKey:env.publicKey,
    privateKey:env.privateKey,
    urlEndpoint:env.urlEndpoint,
})