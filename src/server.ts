import IFrameWork from "./framework/interface.framework";

export class Server {

  constructor( private readonly framework: IFrameWork ) {}

  async start() {
    this.framework.start()
  }

}