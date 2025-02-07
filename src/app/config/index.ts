import dotenv from 'dotenv'
dotenv.config()
export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expiry: process.env.JWT_ACCESS_EXPIRY,
  NODE_ENV: process.env.NODE_ENV,
}
