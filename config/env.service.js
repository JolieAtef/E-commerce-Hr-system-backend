import dotenv, { config } from "dotenv"

dotenv.config({path:"./config/.env"})

let port = process.env.PORT
let base_url = process.env.BASE_URL_BACKEND
let mongo_url = process.env.MONGODB_URI
let smtp_host = process.env.SMTP_HOST
let smtp_port = process.env.SMTP_PORT
let smtp_user = process.env.SMTP_USER
let smtp_pass = process.env.SMTP_PASS
let publicKey = process.env.IMAGEKIT_PUBLIC_KEY
let privateKey = process.env.IMAGEKIT_PRIVATE_KEY
let urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT


export const env = {
    port, base_url ,mongo_url ,smtp_host,smtp_port,smtp_user, smtp_pass,
    publicKey,privateKey,urlEndpoint
}