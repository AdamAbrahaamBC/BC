import { Document } from "mongoose"
import { IVersion } from "./versionModels";

export interface IPresentationSummary {
  _id: number
  presentationId: number
  lastEdited: string
  title: string
  firstPage: string
}

export interface IPresentation extends Document {
  _id: number
  title: string
  versions: IVersion[]
}
