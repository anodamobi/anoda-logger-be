import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {

    public async authenticate () {

        const jwtToken = this._generateJwtToken();

        return {
            auth: {
                jwt:       jwtToken,
                expiresIn: Number(process.env.JWT_TTL),
            },
        };
    }

    private _generateJwtToken (): string {
        return jwt.sign({},
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: `${process.env.JWT_TTL}s` });
    }
}
