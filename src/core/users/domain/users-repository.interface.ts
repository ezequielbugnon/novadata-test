import UserDTO from "./users-dto";

export interface UserPresenter {
    id: number;
    name: string;
    email: string;
}

export default interface IUsersRepository {
    login(email: string, password: string):  Promise<UserPresenter>
    register(user: UserDTO): Promise<UserPresenter>
}