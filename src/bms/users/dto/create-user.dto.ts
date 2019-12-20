import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    readonly remark?: string;

    readonly status?: number;

    readonly [key: string]: any;
}
