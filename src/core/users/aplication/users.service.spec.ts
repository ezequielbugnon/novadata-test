import { describe, expect, beforeEach , it} from 'vitest'
import UserService from './users.service'
import { JwtAdapter } from '../../../libs/jwt';
import IUsersRepository, { UserPresenter } from '../domain/users-repository.interface';
import UserDTO from '../domain/users-dto';

let userService: UserService;

class mockRepository implements IUsersRepository{
    login(email: string): Promise<UserPresenter> {
        if(email === 'noexistemail@gmail.com'){
            const err = new Error("Email not exist")
            err.name = "internalError"
            throw err
        }

        return Promise.resolve({
            id: 1,
            name: 'John Doe',
            password: 'hashedPassword', 
            email: 'john.doe@example.com',
            createdAt: new Date(),
        });
    }
    register(user: UserDTO): Promise<UserPresenter> {
        return Promise.resolve({
            id: 1,
            name: 'John Doe',
            password: 'hashedPassword', 
            email: 'john.doe@example.com',
            createdAt: new Date(),
        });
    }
    
}


describe('test user.service', () => {
    beforeEach(() => {
        const jwt = JwtAdapter.generateToken
        const repository = new mockRepository()
        userService = new UserService(repository, jwt)
    })


    it('test register', () => {
        const response = userService.register('usuario 1', '123456', 'something@gmail.com')

        expect(response).resolves.toBeTypeOf('object')
    })

    
    it('test register, password smaller than 5 caracheters ', () => {
        const response = userService.register('usuario 1', '12345', 'something@gmail.com')

        expect(response).rejects.toThrow('Password cannot be empty and must be a string with a length greater than 5')
    })

    it('test login', () => {
        const response = userService.login('something@gmail.com', '123456')
        expect(response).resolves.toBeTypeOf('object')
    })

    it('test login, not email', () => {
        const response = userService.login('something', '123546')

        expect(response).rejects.toThrow('Invalid email format')
    })

    it('test login, error internal', () => {
        const response = userService.login('noexistemail@gmail.com', '123456')

        expect(response).rejects.toThrow('Email not exist')
    })

})