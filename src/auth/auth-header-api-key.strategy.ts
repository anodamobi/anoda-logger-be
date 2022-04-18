import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor (private readonly configService: ConfigService) {
        super({ header: 'x-access-token', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    public validate = (apiKey: string, done) => {
        if (this.configService.get('API_KEY') === apiKey) {
            // eslint-disable-next-line callback-return
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    };
}
