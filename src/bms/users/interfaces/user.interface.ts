import { Document, Schema } from 'mongoose';

export interface User extends Document {
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    password: string;
    readonly remark: string;
    readonly status?: number;
}
