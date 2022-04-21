import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../_schemas/user.schema';

@Module({
    imports:   [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [UserRepository],
    exports:   [UserRepository],
})
export class UserModule {}
