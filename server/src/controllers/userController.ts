import { Request, Response } from "express";
import { User } from "../database/user";
import { IUser } from "../models/userModels";

export class UserController {

  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    const userId: string = res.locals.jwtPayload.userId

    const user: IUser = await User.findById(userId)
    if (!user) {
      res.status(404).json("User not found!")
      return
    }

    res.status(200).json(user)
  }
}
