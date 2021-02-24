import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.type'

@ObjectType()
export class UserToken {
  @Field()
  token: string

  @Field()
  user: User
}