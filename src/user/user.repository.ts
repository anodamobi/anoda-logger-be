import { InjectModel } from '@nestjs/mongoose';

export class UserRepository {
    constructor (@InjectModel('User') private userModel) {}

    public async findOne (options) {
        return this.userModel.findOne(options);
    }

    public async create (userData) {
        return this.userModel.create(userData);
    }

    public async update (userData) {
        await this.userModel.updateOne({ _id: userData._id }, userData);

    }
}
