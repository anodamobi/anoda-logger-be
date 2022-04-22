import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './strategies/auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports:     [PassportModule, ConfigModule, UserModule],
    controllers: [AuthController],
    providers:   [HeaderApiKeyStrategy, GoogleStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
