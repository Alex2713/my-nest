import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsPhoneNumber('CN')
    readonly phone: string;

    readonly remark?: string;

    readonly [key: string]: any;
}
