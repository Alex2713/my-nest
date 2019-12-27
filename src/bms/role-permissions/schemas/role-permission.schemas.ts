import * as mongoose from 'mongoose';

export const RolePermissionSchema = new mongoose.Schema({
    roleId: { type: String, required: true, unique: true },
    permissionId: { type: String, required: true, unique: true },
});
