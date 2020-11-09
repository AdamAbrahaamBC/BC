import { Document } from "mongoose"
import { IPresentationSummary } from "./presentationModels"

export interface IUserRequest {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface IUser extends Document {
  _id: number
  email: string
  firstName: string
  lastName: string
  password: string
  presentations: IPresentationSummary[]
}
