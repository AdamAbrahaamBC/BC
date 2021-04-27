import { Request, Response } from "express";
import { IUser } from "../models/userModels";
import { IPresentationRequest, IPresentation } from "../models/presentationModels";
import userRepository from "../repository/userRepository";
import presentationRepository from "../repository/presentationRepository";

export class PresentationController {

  public async save(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = await userRepository.getUserById(res.locals.jwtPayload.userId)
      if (!user) {
        res.status(404).json("User not found!")
        return
      }

      const presentation: IPresentationRequest = req.body.presentation

      let savedPresentation: IPresentation = null
      if (presentation.id) {
        await presentationRepository.updatePresentation(user, presentation)
      } else {
        savedPresentation = await presentationRepository.newPresentation(user, presentation)
      }

      res.status(201).json({ newId: savedPresentation._id })
    } catch {
      res.status(500)
    }
  }

  public async get(req: Request, res: Response): Promise<void> {
    try {
      const presentationId: string = req.query.id as string

      const presentation: IPresentation = await presentationRepository.getPresentation(presentationId)
      if (!presentation) {
        res.status(404).json("Presentation not found!")
      }

      res.status(200).json(presentation)
    } catch {
      res.status(500)
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = await userRepository.getUserById(res.locals.jwtPayload.userId)
      if (!user) {
        res.status(404).json("User not found!")
        return
      }

      const presentationId: string = req.query.id as string
      presentationRepository.deletePresentation(user, presentationId)

      res.status(200).json("DELETED")
    } catch {
      res.status(500)
    }
  }

  public async deleteVersion(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = await userRepository.getUserById(res.locals.jwtPayload.userId)
      if (!user) {
        res.status(404).json("User not found!")
        return
      }

      const presentationId: string = req.query.id as string
      const version: number = Number(req.query.version)

      presentationRepository.deleteVersion(user, presentationId, version)

      res.status(200).json("DELETED")
    } catch {
      res.status(500)
    }
  }
}
