import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String,
    remark: String,
    status: Number,
});
