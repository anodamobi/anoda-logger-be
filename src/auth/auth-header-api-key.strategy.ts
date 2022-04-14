import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import Strategy from 'passport-headerapikey';

config();

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor () {
        super({ header: 'x-access-token', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (process.env.API_KEY === apiKey) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    };
}
