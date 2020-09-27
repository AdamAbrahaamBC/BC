import { Request, Response } from "express";
import { IUser, User } from "../database/user";

export class UserController {

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.find({ email: req.params.email })

      if (!user) {
        res.status(404)
        return
      }

      res.status(200).json(user)
    } catch {
      res.status(500)
    }
  }
}
