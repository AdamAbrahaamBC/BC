import { Document } from "mongoose"
import { IVersion } from "./versionModels";

export interface IPresentationSummary {
  presentationId: number
  lastEdited: string
  title: string
  firstPage: string
}

export interface IPresentationRequest {
  id: number
  title: string
  description: string
  versionNumber: number
  slides: string[]
}

export interface IPresentation extends Document {
  _id: number
  title: string
  versions: IVersion[]
}
