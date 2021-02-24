import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly defaultAdmin: {username: string, Email: string; password: string }

  constructor(private readonly config: ConfigService) {
    super()
    this.defaultAdmin = this.config.get('admin')
  }

  public async onModuleDestroy() {
    await this.$disconnect()
  }

  public async onModuleInit() {
    await this.$connect()
    //await this.ensureAdminUser()
  }

  async createUser({ username, Email, password }: { username: string; Email: string, password: string }) :Promise<any>{
    console.log(this.user)
    return await this.user.create({
        data: {
            username ,
            Email,
            password ,
        }
    })
}
  
  
  async findUserById(id: number):Promise<any> {
    return await this.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findUserByEmail(Email: string):Promise<any> {
    return await this.user.findUnique({
      where: {
        Email,
      },
    })
  }
  
  private async ensureAdminUser() {
    // Check if we have an admin
    const found = await this.findUserByEmail(this.defaultAdmin.Email)

    if (found) {
      Logger.log(`Admin user: ${found.Email}`, 'UserService')
      return true
    }

    // If not, create it for us
    const created = await this.createUser(this.defaultAdmin)

    Logger.log(`Created Admin user: ${created.Email}`, 'DataService')
  }
  
}