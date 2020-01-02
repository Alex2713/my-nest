import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const RolePermissionSchema = new mongoose.Schema({
    roleId: { type: Schema.Types.ObjectId, required: true },
    permissionId: { type: Schema.Types.ObjectId, required: true },
});
