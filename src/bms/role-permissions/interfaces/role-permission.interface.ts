import { Document } from 'mongoose';

export interface RolePermission extends Document {
    readonly _id: string;
    readonly roleId: string;
    readonly permissionId: string;
}
