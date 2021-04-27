import { Request, Response } from "express";
import { IUser, IUserRequest } from "../models/userModels";
import userRepository from "../repository/userRepository";

export class AuthController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const exists = await userRepository.getUserByEmail(req.body.email)
      if (exists) {
        res.status(400).json("Email already exists!")
        return
      }

      const newUserData: IUserRequest = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }

      userRepository.saveNewUser(newUserData)
        .then((newUser: IUser) => {
          res.status(201).json(newUser)
        })
        .catch((error: string) => {
          res.status(500).json(error)
        })
    } catch {
      res.status(500)
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = await userRepository.getUserByEmail(req.body.email)
      if (!user) {
        res.status(404).json("User not found!")
        return
      }

      userRepository.getUserToken(req.body.password, user.password, user.id)
        .then((token: string) => {
          res.status(200).json({ token })
        })
        .catch(() => {
          res.status(401).json("Incorrect password!")
        })
    } catch {
      res.status(500)
    }
  }
}
