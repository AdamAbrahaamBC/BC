export interface PresentationDetail {
  _id: string
  title: string
  versions: PresentationVersion[]
}

export interface PresentationVersion {
  number: string
  description: string
  slides: string[]
}
