import { Document, Schema } from 'mongoose';

export interface RolePermission extends Document {
    readonly roleId: Schema.Types.ObjectId;
    readonly permissionId: Schema.Types.ObjectId;
}
