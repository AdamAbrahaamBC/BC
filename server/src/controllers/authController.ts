import { Request, Response } from "express";
import { User } from "../database/user";
import { IUser } from "../models/userModels";
import bcrypt from 'bcrypt';

const saltRounds: number = 10

export class AuthController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const exists = await User.findOne({ email: req.body.email })
      if (exists) {
        res.status(400).json("User already exists!")
        return
      }

      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        const newUser: IUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hash,
          presentations: []
        })

        newUser.save()
        res.status(201).json(newUser)
      }).catch((error) => {
        res.status(500).json(error)
      })
    } catch {
      res.status(500)
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        res.status(404).json("User not found!")
        return
      }

      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          res.status(401).json("Incorrect password!")
          return
        }

        res.status(200).json(user)
      });
    } catch {
      res.status(500)
    }
  }
}
