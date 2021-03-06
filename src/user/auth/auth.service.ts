import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthHelper } from '../config/auth.helper';
import { UserService } from '../user.service';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input';
import { JwtDto } from './dto/jwt.dto';
import { UserToken } from './dto/user-token';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
    constructor(private readonly data: UserService, private readonly jwt: JwtService) {}

    public async login(input: AuthLoginInput): Promise<UserToken> {
        const found = await this.data.findUserByEmail(input.Email)

        if (!found) {
        throw new NotFoundException(`User with email ${input.Email} does not exist`)
        }

        const passwordValid = await AuthHelper.validate(input.password, found.password)

        if (!passwordValid) {
        throw new Error(`Invalid password`)
        }

        return { user: found, token: this.signToken(found.id) }
    }

    public async register(input: AuthRegisterInput): Promise<UserToken> {
        // Make sure that we have user with that email already
        const found = await this.data.findUserByEmail(input.Email)

        if (found) {
        throw new BadRequestException(`Cannot register with email ${input.Email}`)
        }

        const password = await AuthHelper.hash(input.password)
        const created = await this.data.user.create({
        data: {
            ...input,
            password,
        },
        })

        return { user: created, token: this.signToken(created.id) }
    }

    private signToken(id: number) {
        const payload: JwtDto = { userId: id }

        return this.jwt.sign(payload)
    }

    public async validateUser(userId: number) {
        return this.data.findUserById(userId)
      }
}

