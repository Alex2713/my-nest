import { IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {

    @IsNotEmpty()
    readonly roleId: string;

    @IsNotEmpty()
    readonly permissionId: string;
}
