import { Document, Schema, Model, model, Error } from "mongoose"

export interface IVersion extends Document {
  _id: number
  number: number
  slides: string[]
}

export const versionSchema: Schema = new Schema({
  number: Number,
  slides: Array
})

export const Version: Model<IVersion> = model<IVersion>("Version", versionSchema)
