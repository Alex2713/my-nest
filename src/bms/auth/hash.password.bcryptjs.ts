import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { compare } from 'bcryptjs';

/**
 * Service HashPassword using module 'bcryptjs'.
 * It takes in a plain password, generates a salt with given
 * round and returns the hashed password as a string
 */
export type HashPassword = (
    password: string,
    rounds: number,
) => Promise<string>;
// bind function to `services.bcryptjs.HashPassword`
export async function hashPassword(
    password: string,
    rounds: number,
): Promise<string> {
    const salt = await genSalt(rounds);
    const rsl = await hash(password, salt);
    return rsl;
}

export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>;
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

@Injectable()
export class BcryptHasher implements PasswordHasher<string> {

    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        const rsl = await hash(password, salt);
        return rsl;
    }

    async comparePassword(
        providedPass: string,
        storedPass: string,
    ): Promise<boolean> {
        console.log(await this.hashPassword(providedPass));
        const passwordIsMatched = await compare(providedPass, storedPass);
        return passwordIsMatched;
    }
}
