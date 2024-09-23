import jwt from 'jsonwebtoken'
export type TAuth = {
  email: string
  password: string
}
export interface JwtPayloadWithUserEmail extends jwt.JwtPayload {
  userEmail: string
  name?: string
  role?: string
  image?: string
}
