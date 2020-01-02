import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {

    @IsNotEmpty()
    readonly name: string;

    readonly remark: string;

    @IsNotEmpty()
    readonly url: string;

    @IsNotEmpty()
    readonly method: string;

    readonly [key: string]: any;
}
