import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';

export class AppRoutesExpress {

  constructor(){}

  static get routes(): Router {

    const router = Router();
    const authController = new AuthController({})

    router.use('/api/auth', authController.registerUser)

    return router;
  }


}