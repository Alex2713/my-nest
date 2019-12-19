import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    readonly id?: string;

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    readonly remark?: string;

    readonly status?: number;
}
