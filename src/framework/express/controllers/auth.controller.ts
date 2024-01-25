import { Request, Response } from "express";
import { CustomError } from "../../../core/common/error/custom.error";
import UserService from "../../../core/users/aplication/users.service";

export class AuthController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    this.userService
      .register(name, password, email)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    this.userService
      .login(email, password)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
