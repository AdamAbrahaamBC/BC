import { Schema, Model, model } from "mongoose"
import { IPresentation } from "../models/presentationModels";

export const presentationSchema: Schema = new Schema({
  title: String,
  versions: Array
})

export const Presentation: Model<IPresentation> = model<IPresentation>("Presentation", presentationSchema)
