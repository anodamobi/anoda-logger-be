import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository {
    constructor (@InjectModel('RefreshToken') private refreshTokenModel,
    ) {}

    public async create (refreshToken) {
        return  this.refreshTokenModel.create(refreshToken);
    }
}
