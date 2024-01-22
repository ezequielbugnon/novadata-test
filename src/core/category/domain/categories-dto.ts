import { CustomError } from "../../common/error/custom.error";

export default class CategoryDto{
    constructor(private name: string){
        if (!name || typeof name !== 'string') {
            throw CustomError.badRequest('Name cannot be empty and must be string');
        }
    }

    get(): string{
        return this.name;
    }
}