import { Document, Schema, Model, model, Error } from "mongoose";
import { IPresentation } from "./presentation";

export interface IUser extends Document {
  email: string;
  password: string;
  presentations: IPresentation[]
}

export const userSchema: Schema = new Schema({
  email: String,
  password: String,
  presentations: Array
});

export const User: Model<IUser> = model<IUser>("User", userSchema);
