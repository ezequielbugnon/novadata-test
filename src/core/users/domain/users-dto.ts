import { BcryptAdapter } from "../../../libs/bcrypt";
import { CustomError } from "../../common/error/custom.error";

export default class UserDTO {
    constructor(private name: string, private password: string, private email: string){
        if (!name || typeof name !== 'string') {
            throw CustomError.badRequest('Name cannot be empty and must be string');
        }

        if (!password || (typeof password !== 'string' || password.length <= 5)) {
            throw CustomError.badRequest('Password cannot be empty and must be a string with a length greater than 5');
        }        
      
      
        if (!email || typeof email !== 'string' || !this.validateEmail(email)) {
            throw CustomError.badRequest('Email is invalid');
        }
    }

    get() {
        return {
            password: BcryptAdapter.hash(this.password),
            email: this.email,
            name: this.name
        }
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
}