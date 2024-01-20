import express, { Router } from 'express';
import cors from 'cors'
import IFrameWork from '../interface.framework';

interface Options{
  port?: number;
  routes: Router;
}


export class ExpressImplementation implements IFrameWork {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options ) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;

  }


  async start() {

    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) ); 
    this.app.use( cors())


    this.app.use( this.routes );

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    })

  }

}