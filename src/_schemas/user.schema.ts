import { Schema }  from 'mongoose';

export const UserSchema = new Schema({
    authToken: String,
    email:     String,
    lastName:  String,
    firstName: String,
}, {
    versionKey: false,
    timestamps: true,
});
