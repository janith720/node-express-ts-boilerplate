import express, { Application, Request, Response } from "express";

class App {
  public app: Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = 3000;
    this.setRoutes();
  }

  private setRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world");
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Connected successfully on port ${this.port}`);
    });
  }
}

export default App;
