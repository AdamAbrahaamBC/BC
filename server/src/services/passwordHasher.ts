import bcrypt from 'bcrypt';

class PasswordHasher {

  private readonly saltRounds: number = 10

  public async newHash(password: string): Promise<string> {
    let hashedPassword: string | null = null

    await bcrypt.hash(password, this.saltRounds).then((hash) => {
      hashedPassword = hash
    })

    return hashedPassword
  }

  public async compare(plainPassword: string, hashedPassword: string,): Promise<boolean> {
    let passwordsMatch: boolean = false

    await bcrypt.compare(plainPassword, hashedPassword).then((valid) => {
      passwordsMatch = valid
    })

    return passwordsMatch
  }

}

const passwordHasher = new PasswordHasher()

export default passwordHasher
