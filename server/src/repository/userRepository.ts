import { User } from "../database/user";
import { IUser, IUserRequest } from "../models/userModels";
import { IPresentationRequest, IPresentationSummary } from "../models/presentationModels";
import passwordHasher from '../services/passwordHasher';
import * as jwt from 'jsonwebtoken';
import dayjs from 'dayjs'

const saltRounds: number = 10

class UserRepository {

  public async getUserById(userId: string): Promise<IUser> {
    return await User.findById(userId)
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email: email })
  }

  public async saveNewUser(newUserData: IUserRequest): Promise<IUser> {
    const hashedPassword = await passwordHasher.newHash(newUserData.password)
    if (!hashedPassword) {
      return Promise.reject(new Error('Unsuccessful password hashing!'))
    }

    const newUser: IUser = new User({
      email: newUserData.email,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      password: hashedPassword,
      presentations: []
    })

    return newUser.save()
  }

  public async getUserToken(plainPassword: string, hashedPassword: string, userId: string): Promise<string> {
    const passwordsMatch = await passwordHasher.compare(plainPassword, hashedPassword)
    if (passwordsMatch) {
      return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET)
    }

    return Promise.reject(new Error('Incorrect password!'))
  }

  public async newPresentationSummary(user: IUser, presentation: IPresentationRequest): Promise<IUser> {
    const presentationSummary: IPresentationSummary = {
      presentationId: presentation.id,
      lastEdited: dayjs().format('DD.MM.YYYY HH:MM'),
      title: presentation.title,
      currentVersion: presentation.versionNumber
    }

    user.presentations.push(presentationSummary)

    return user.save()
  }

  public async updatePresentationSummary(user: IUser, presentation: IPresentationRequest): Promise<IUser> {
    const presentationSummary: IPresentationSummary = user.presentations.find(x => x.presentationId.toString() === presentation.id)
    presentationSummary.title = presentation.title
    presentationSummary.lastEdited = dayjs().format('DD.MM.YYYY HH:MM'),

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
