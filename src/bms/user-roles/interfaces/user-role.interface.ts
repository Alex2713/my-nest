import { Document, Schema } from 'mongoose';

export interface UserRole extends Document {
    readonly userId: Schema.Types.ObjectId;
    readonly roleId: Schema.Types.ObjectId;
}
