import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './strategies/auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports:     [PassportModule, ConfigModule],
    controllers: [AuthController],
    providers:   [HeaderApiKeyStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
