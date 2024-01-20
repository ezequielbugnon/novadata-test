import { Request, Response } from 'express';
import { CustomError } from '../../../core/common/erros/custom.error';




export class AuthController {

  constructor(
    private readonly authRepository: {},
  ) {}

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }


  registerUser = (req: Request, res: Response ) => {
    
    return res.status(200).json({'auth': 'dar'})
  }

}