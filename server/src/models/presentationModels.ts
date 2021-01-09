import { Document } from "mongoose"
import { IVersion } from "./versionModels";

export interface IPresentationSummary {
  presentationId: string
  lastEdited: string
  title: string
  currentVersion: number
}

export interface IPresentationRequest {
  id: string
  title: string
  description: string
  versionNumber: number
  slides: string[]
}

export interface IPresentation extends Document {
  _id: string
  title: string
  versions: IVersion[]
}
