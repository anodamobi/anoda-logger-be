import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleUserDto } from './dto/google-user.dto';
import { IUserAuthenticationPayload, TUserAuth } from '../interfaces/interfaces';
import { UserRepository } from '../user/user.repository';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import crypto from 'node:crypto';


@Injectable()
export class AuthService {

    constructor (private readonly userRepository: UserRepository) {}

    public async googleLogin (userFromGoogle: GoogleUserDto, ip: string, isIosLogin = false): Promise<TUserAuth> {
        if (!userFromGoogle || !userFromGoogle.email || !userFromGoogle.googleId) {
            throw new InternalServerErrorException('Error handling Google OAuth2');
        }

        return this.authenticate({
            id:        userFromGoogle.googleId,
            authType:  'google',
            email:     userFromGoogle.email,
            firstName: userFromGoogle.firstName,
            lastName:  userFromGoogle.lastName,
        }, ip, isIosLogin);
    }

    private async authenticate (userPayload: IUserAuthenticationPayload, ip, isIosAuth = false) {
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


        const jwtToken = this._generateJwtToken(user._id, isIosAuth);
        const refreshToken = await this._generateRefreshToken(user._id, ip);

        return {
            user: user,
            auth: {
                jwt:          jwtToken,
                refreshToken: refreshToken.token,
                expiresIn:    Number(process.env.JWT_TTL),
            },
            isNewUser,
        };
    }

    private _generateJwtToken (userId: string, isIosAuth = false): string {
        return jwt.sign({ sub: userId, id: userId },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: `${isIosAuth ? moment.duration(1, 'months').seconds() : process.env.JWT_TTL}s` });
    }

    private async _generateRefreshToken (userId: string, ip: string) {
        const token = new RefreshToken({
            userId,
            token:       this._randomTokenString(),
            expiresAt:   moment().add(process.env.REFRESH_TOKEN_TTL, 'seconds').toDate(),
            createdByIp: ip,
        });
    }
    private _randomTokenString () {
        return crypto.randomBytes(360).toString('hex');
    }
}
