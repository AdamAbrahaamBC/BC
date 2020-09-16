import { Document, Schema, Model, model, Error } from "mongoose";
import { IVersion } from "./version";

export interface IPresentation extends Document {
  name: string;
  description: string;
  versions: IVersion[]
}

export const presentationSchema: Schema = new Schema({
  name: String,
  description: String,
  version: Array
});

export const Presentation: Model<IPresentation> = model<IPresentation>("Presentation", presentationSchema);
