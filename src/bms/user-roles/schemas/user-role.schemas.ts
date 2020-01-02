import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const UserRoleSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    roleId: { type: Schema.Types.ObjectId, required: true },
});
