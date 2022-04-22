import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleUserDto } from './dto/google-user.dto';
import { IUserAuthenticationPayload, TUserAuth } from '../interfaces/interfaces';
import { UserRepository } from '../user/user.repository';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
    constructor (private readonly userRepository: UserRepository) {}

    public async googleLogin (userFromGoogle: GoogleUserDto): Promise<TUserAuth> {
        if (!userFromGoogle || !userFromGoogle.email || !userFromGoogle.googleId) {
            throw new InternalServerErrorException('Error handling Google OAuth2');
        }

        return this.authenticate({
            id:        userFromGoogle.googleId,
            email:     userFromGoogle.email,
            firstName: userFromGoogle.firstName,
            lastName:  userFromGoogle.lastName,
        });
    }

    private async authenticate (userPayload: IUserAuthenticationPayload) {
        let user = await this.userRepository.findOne({ authToken: userPayload.id });
        let isNewUser = false;

        if (!user) {
            user = await this.userRepository.create({
                authToken: userPayload.id,
                email:     userPayload?.email,
                lastName:  userPayload?.lastName,
                firstName: userPayload?.firstName,
            });

            isNewUser = true;
        }
        else {
            if (user.email && userPayload.email && user.email !== userPayload.email) {
                user.email = userPayload.email;
                await this.userRepository.update(user);
            }
        }

        const jwtToken = this._generateJwtToken(user._id);

        return {
            user: user,
            auth: {
                jwt:       jwtToken,
                expiresIn: Number(process.env.JWT_TTL),
            },
            isNewUser,
        };
    }

    private _generateJwtToken (userId: string): string {
        return jwt.sign({ sub: userId, id: userId },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: `${process.env.JWT_TTL}s` });
    }
}
