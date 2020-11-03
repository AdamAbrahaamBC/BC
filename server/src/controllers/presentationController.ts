import { Request, Response } from "express";
import { IUser } from "../models/userModels";
import { IPresentationRequest } from "../models/presentationModels";
import userRepository from "../repository/userRepository";
import presentationRepository from "../repository/presentationRepository";

export class PresentationController {

  public async save(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = await userRepository.getUser(res.locals.jwtPayload.userId)
      if (!user) {
        res.status(404).json("User not found!")
        return
      }

      const presentation: IPresentationRequest = req.body.presentation
      if (presentation.id) {
        await presentationRepository.updatePresentation(user, presentation)
      } else {
        await presentationRepository.newPresentation(user, presentation)
      }

      res.status(201)
    } catch {
      res.status(500)
    }
  }
}
