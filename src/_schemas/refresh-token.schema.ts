import { Types } from 'mongoose';
import * as mongoose from 'mongoose';

export const RefreshTokenSchema = new mongoose.Schema({
    userId:          { type: Types.ObjectId, ref: 'users', required: true },
    token:           { type: String, unique: true },
    expiresAt:       { type: Date },
    createdByIp:     { type: String /* required: true*/ },
    revokedAt:       { type: Date },
    revokedByIp:     { type: String },
    replacedByToken: { type: String },
});


RefreshTokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

RefreshTokenSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});
