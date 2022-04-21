import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './strategies/auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
    imports:   [PassportModule, ConfigModule],
    providers: [HeaderApiKeyStrategy, GoogleStrategy],
})
export class AuthModule {}
