export interface PresentationDetail {
  _id: string
  title: string
  versions: PresentationVersion[]
}

export interface PresentationVersion {
  number: number
  description: string
  slides: string[]
}
