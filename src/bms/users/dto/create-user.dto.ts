import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    readonly email?: string;

    @IsPhoneNumber('+86')
    readonly phone?: string;

    readonly remark?: string;

    readonly [key: string]: any;
}
