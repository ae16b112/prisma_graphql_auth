import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthRegisterInput {
  @Field()
  username: string

  @Field()
  Email: string

  @Field()
  password: string
}