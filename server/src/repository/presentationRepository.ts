import { IPresentation, IPresentationRequest } from "../models/presentationModels";
import { Presentation } from "../database/presentation";
import { IVersion } from "../models/versionModels";
import { IUser } from "../models/userModels";
import userRepository from "../repository/userRepository";

class PresentationRepository {

  public async getPresentation(presentationId: string): Promise<IPresentation> {
    return Presentation.findById(presentationId)
  }

  public async deletePresentation(user: IUser, presentationId: string): Promise<void> {
    userRepository.deletePresentationSummary(user, presentationId)
    await Presentation.findByIdAndDelete(presentationId)
  }

  public async deleteVersion(user: IUser, presentationId: string, version: number): Promise<IPresentation | void> {
    const presentation = await Presentation.findById(presentationId)
    if (!presentation) {
      return Promise.resolve()
    }

    if (presentation.versions.length === 1) {
      this.deletePresentation(user, presentationId)
    } else {
      presentation.versions = presentation.versions.filter((v: IVersion) => v.number !== version)
      presentation.versions = presentation.versions.map((v: IVersion) => {
        if (v.number > version) {
          v.number--
        }

        return v
      })

      await userRepository.updatePresentationSummaryCurrentVersion(user, presentationId, presentation.versions.length)
      return presentation.save()
    }
  }

  public async newPresentation(user: IUser, presentationData: IPresentationRequest): Promise<IPresentation> {
    const version: IVersion = {
      number: presentationData.versionNumber,
      description: presentationData.description,
      slides: presentationData.slides
    }

    const newPresentation: IPresentation = new Presentation({
      title: presentationData.title,
      versions: [version]
    })

    newPresentation.save().then(() => {
      presentationData.id = newPresentation._id
      userRepository.newPresentationSummary(user, presentationData)
    })

    return newPresentation
  }

  public async updatePresentation(user: IUser, presentationData: IPresentationRequest): Promise<IPresentation | void> {
    const presentation: IPresentation = await Presentation.findById(presentationData.id)
    if (!presentation) {
      return Promise.resolve()
    }

    presentation.title = presentationData.title

    const version: IVersion = {
      number: presentationData.versionNumber,
      description: presentationData.description,
      slides: presentationData.slides
    }

    const versionIndex = presentation.versions.findIndex(x => x.number === presentationData.versionNumber)
    if (~versionIndex) {
      presentation.versions[versionIndex] = version
      presentation.markModified('versions')
    } else {
      presentation.versions.push(version)
    }

    userRepository.updatePresentationSummary(user, presentationData)

    return presentation.save()
  }
}

const presentationRepository = new PresentationRepository()

export default presentationRepository
