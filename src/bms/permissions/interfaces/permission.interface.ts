import { Document, Schema } from 'mongoose';

export interface Permission extends Document {
    readonly name: string;
    readonly url: string;
    readonly method: string;
    readonly remark: string;
    readonly status: string;
    readonly [key: string]: any;
}
