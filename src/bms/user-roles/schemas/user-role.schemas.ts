import * as mongoose from 'mongoose';

export const UserRoleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roleId: { type: String, required: true },
});
