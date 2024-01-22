import { promises } from "readline";
import prisma from "../../../database/prismaClient";
import UserDTO from "../domain/users-dto";
import IUsersRepository, { UserPresenter } from "../domain/users-repository.interface";
import { BcryptAdapter } from "../../../libs/bcrypt";
import { CustomError } from "../../common/error/custom.error";



export default class UserRepositoryPrisma implements IUsersRepository{
    private db;
    constructor(){
        this.db = prisma;
    }

    async login(email: string, password: string): Promise<UserPresenter> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if(user) {
                const compared = BcryptAdapter.compare(password, user.password)

                if(compared){
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                }

                throw CustomError.badRequest('Error during autentication');
            }

            throw CustomError.badRequest('Error during autentication');
        } catch (error) {
            throw error
        }   
    }

    async register(user: UserDTO): Promise<UserPresenter> {
        try {
            return await prisma.user.create({
                data: user.get()
            })
        } catch (error) {
            throw error
        }
    } 
}

