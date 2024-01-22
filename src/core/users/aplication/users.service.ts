import { JwtAdapter } from "../../../libs/jwt";
import { CustomError } from "../../common/error/custom.error";
import UserDTO from "../domain/users-dto";
import IUsersRepository from "../domain/users-repository.interface";

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface UserToken {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default class UserService {
  constructor(
    private readonly repository: IUsersRepository,
    private readonly jwt: SignToken = JwtAdapter.generateToken
  ) {}

  async login(email: string, password : string) {
    try {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw CustomError.badRequest('Invalid email format');
        }

        if (!password || (typeof password !== 'string' || password.length <= 5)) {
            throw CustomError.badRequest('Invalid password format');
        } 

        const user = await this.repository.login(email, password);

        const token = await this.jwt({ id: user?.id }, '2h');
        if ( !token ) throw CustomError.internalServer('Error generating token');
    
        return {
          token: token,
          user: {
            id: user?.id,
            name: user?.name,
            email: user?.email,
          }
        };
    } catch (error) {
        throw error
    }   
  }

  async register(user: string, password: string, email: string): Promise<UserToken> {
    try {
      const userDto = new UserDTO(user, password, email);

      const userValidate = await this.repository.register(userDto);

      const token = await this.jwt({ id: userValidate?.id }, "2h");
      if (!token) throw CustomError.internalServer("Error generating token");

      return {
        token: token,
        user: {
          id: userValidate?.id,
          name: userValidate?.name,
          email: userValidate?.email
        },
      };
    } catch (error) {
      
      console.log(error)
      throw error;
    }
  }
}
