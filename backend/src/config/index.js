const {
    PORT,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_DB_NAME,
    MONGODB_ATLAS_NAME,
    DB_URL,
    EMAIL,
    EMAIL_USER_NAME,
    EMAIL_PASSWORD,
    JWT_SECRET_KEY,
    ADMIN_JWT_SECRET_KEY,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CRYPTO_SECRET_KEY,
    SMS_URI,
    SMS_API_USER_NAME,
    SMS_API_PASSWORD,
    JWT_COOKIE_EXPIRES_IN,
    ADMIN_JWT_COOKIE_EXPIRES_IN,
    NODE_ENV
} = process.env

const config = {
    env: {
        NODE_ENV: NODE_ENV
    },
    app: {
        port: parseInt(PORT)
    },
    mongo_db: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD,
        db_name: MONGODB_DB_NAME,
        atlas_name: MONGODB_ATLAS_NAME,
        url: DB_URL
    },
    jwt: {
        key: JWT_SECRET_KEY,
        expire: JWT_COOKIE_EXPIRES_IN
    },
    admin_jwt: {
        key: ADMIN_JWT_SECRET_KEY,
        expire: ADMIN_JWT_COOKIE_EXPIRES_IN
    },
    cloudinary: {
        name: CLOUDINARY_NAME,
        api: CLOUDINARY_API_KEY,
        secret: CLOUDINARY_API_SECRET
    },
    sms: {
        uri: SMS_URI,
        username: SMS_API_USER_NAME,
        password: SMS_API_PASSWORD
    },
    email: {
        address: EMAIL,
        username: EMAIL_USER_NAME,
        password: String(EMAIL_PASSWORD)
    },
    encrypt: {
        key: CRYPTO_SECRET_KEY
    }
};

export { config }