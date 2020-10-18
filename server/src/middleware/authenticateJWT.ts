import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import { IUser } from "../models/userModels";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string = req.headers['authorization']
  if (!authHeader) {
    return res.sendStatus(401)
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error: any, user: any) => {
    if (error) {
      return res.sendStatus(403)
    }

    res.locals.jwtPayload = user
    next()
  })

}
