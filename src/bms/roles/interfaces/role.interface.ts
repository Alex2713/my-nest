import { Document, Schema } from 'mongoose';

export interface Role extends Document {
    readonly name: string;
    readonly remark: string;
    readonly status: string;
    readonly [key: string]: any;
}
