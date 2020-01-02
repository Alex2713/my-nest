import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateRolePermissionDto {

    @IsNotEmpty()
    readonly roleId: Schema.Types.ObjectId;

    @IsNotEmpty()
    readonly permissionId: Schema.Types.ObjectId;
}
