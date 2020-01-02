import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../bms/logger/logger.service';
import { UsersService } from 'src/bms/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private loggerService: LoggerService,
        private userService: UsersService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const resource = this.reflector.get<string[]>('resource', context.getHandler());
        const path = request.path;
        const method1 = request.method.toLowerCase();
        const user = request.user || {};
        const userPermissions = await this.userService.getRolesPermissionsById(user.userId);
        this.addLogger(request);
        return true;
    }
    async addLogger(request: any): Promise<void> {
        const path = request.path;
        const method1 = request.method.toLowerCase();
        const user = request.user || {};
        await this.loggerService.create({
            username: user.username,
            userId: user.userId,
            method: method1,
            url: path,
        });
    }
}
