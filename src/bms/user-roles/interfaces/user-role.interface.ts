import { Document } from 'mongoose';

export interface UserRole extends Document {
    readonly _id: string;
    readonly userId: string;
    readonly roleId: string;
}
