import { Schema } from 'mongoose';

export class CreateLoggerDto {

    readonly userId: Schema.Types.ObjectId;

    readonly username: string;

    readonly method: string;

    readonly url: number;

    readonly [key: string]: any;
}
