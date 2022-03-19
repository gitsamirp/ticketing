import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util'; // helps convert callback style scrypt to a async

const scryptAsync = promisify(scrypt)

export class Password {
    static async hash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer; //help typescrypt define buffer as a Buffer

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compareHash(storedPassword: string, inputPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(inputPassword, salt, 64)) as Buffer;

        return buffer.toString('hex') === hashedPassword;
    }
}