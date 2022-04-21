import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './strategies/auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from '../_schemas/refresh-token.schema';
import { AuthService } from './auth.service';
import { UserSchema } from '../_schemas/user.schema';
import { UserModule } from '../user/user.module';

@Module({
    imports: [PassportModule, ConfigModule, UserModule,
        MongooseModule.forFeature([{ name: 'RefreshToken', schema: RefreshTokenSchema },
            { name: 'User', schema: UserSchema }])],
    controllers: [AuthController],
    providers:   [HeaderApiKeyStrategy, GoogleStrategy, RefreshTokenRepository, AuthService],
})
export class AuthModule {}
