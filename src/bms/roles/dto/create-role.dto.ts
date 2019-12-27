import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly remark: string;

    readonly [key: string]: any;
}
