import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLoggerDto {

    readonly userId: string;

    readonly username: string;

    readonly method: string;

    readonly url: number;

    readonly [key: string]: any;
}
