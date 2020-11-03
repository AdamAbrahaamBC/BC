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
      lastEdited: new Date().toString(),
      title: presentation.title,
      firstPage: presentation.slides[0]
    }

    user.presentations.push(presentationSummary)

    return user.save()
  }

  public async updatePresentationSummary(user: IUser, presentation: IPresentationRequest): Promise<IUser> {
    const presentationSummary: IPresentationSummary = user.presentations.find(x => x.presentationId === presentation.id)

    presentationSummary.title = presentation.title
    presentationSummary.lastEdited = new Date().toString()
    presentationSummary.firstPage = presentation.slides[0]

    user.markModified('presentations')

    return user.save()
  }
}

const userRepository = new UserRepository()

export default userRepository
