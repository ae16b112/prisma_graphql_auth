import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthLoginInput {
  @Field()
  Email: string

  @Field()
  password: string
}