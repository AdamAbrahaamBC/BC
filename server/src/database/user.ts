import { Schema, Model, model } from "mongoose"
import { IUser } from "../models/userModels";

export const userSchema: Schema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  presentations: Array
})

export const User: Model<IUser> = model<IUser>("User", userSchema)
