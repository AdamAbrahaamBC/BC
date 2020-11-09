import { User } from "../database/user";
import { IUser } from "../models/userModels";
import { IPresentationRequest, IPresentationSummary } from "../models/presentationModels";

class UserRepository {

  public async getUser(userId: number): Promise<IUser> {
    return await User.findById(userId)
  }

  public async newPresentationSummary(user: IUser, presentation: IPresentationRequest): Promise<IUser> {
    const presentationSummary: IPresentationSummary = {
      presentationId: presentation.id,
      lastEdited: new Date().toLocaleString('sk'),
      title: presentation.title,
      currentVersion: presentation.versionNumber
    }

    user.presentations.push(presentationSummary)

    return user.save()
  }

  public async updatePresentationSummary(user: IUser, presentation: IPresentationRequest): Promise<IUser> {
    const presentationSummary: IPresentationSummary = user.presentations.find(x => x.presentationId === presentation.id)

    presentationSummary.title = presentation.title
    presentationSummary.lastEdited = new Date().toLocaleString('sk')

    user.markModified('presentations')

    return user.save()
  }

  public async deletePresentationSummary(user: IUser, presentationId: string): Promise<void> {
    const summaryIndex = user.presentations.findIndex(x => x.presentationId == presentationId)
    if (~summaryIndex) {
      user.presentations.splice(summaryIndex, 1);
      user.markModified('presentations')
      user.save()
    }
  }
}

const userRepository = new UserRepository()

export default userRepository
