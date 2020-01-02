import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateUserRoleDto {

    @IsNotEmpty()
    readonly userId: Schema.Types.ObjectId;

    @IsNotEmpty()
    readonly roleId: Schema.Types.ObjectId;
}
