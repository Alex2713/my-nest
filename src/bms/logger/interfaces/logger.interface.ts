import { Document, Schema } from 'mongoose';

export interface Logger extends Document {

    readonly userId: string;

    readonly username: string;

    readonly method: string;

    readonly url: number;

    readonly [key: string]: any;
}
