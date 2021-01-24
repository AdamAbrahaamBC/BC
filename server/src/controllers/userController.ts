import { Request, Response } from "express";
import { IUser } from "../models/userModels";
import { IPresentationSummary } from "../models/presentationModels"
import userRepository from "../repository/userRepository";

export class UserController {

  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    const user: IUser = await userRepository.getUserById(res.locals.jwtPayload.userId)
    if (!user) {
      res.status(404).json("User not found!")
      return
    }

    delete user.email
    delete user.password

    res.status(200).json({ user })
  }

  public async getUserPresentations(req: Request, res: Response): Promise<void> {
    const user: IUser = await userRepository.getUserById(res.locals.jwtPayload.userId)
    if (!user) {
      res.status(404).json("User not found!")
      return
    }

    const presentations: IPresentationSummary[] = user.presentations
    res.status(200).json({ presentations })
  }
}
