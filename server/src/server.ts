import express from "express";
import dotenv from "dotenv"

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    //this.routes();
  }

  public config(): void {
    this.app.set("port", 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    dotenv.config()
    //this.app.use(compression());
    //this.app.use(cors());
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("\n\n\n\nAPI is running at http://localhost:%d", this.app.get("port"));
    });
  }

}

const server = new Server();
server.start();
