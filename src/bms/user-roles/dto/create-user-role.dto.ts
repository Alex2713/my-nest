import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {

    @IsNotEmpty()
    readonly userId: string;

    @IsNotEmpty()
    readonly roleId: string;
}
