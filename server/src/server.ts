import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    //this.routes();
    this.database();
  }

  public config(): void {
    this.app.set("port", 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    dotenv.config()
    //this.app.use(compression());
    //this.app.use(cors());
  }

  private database() {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected");
    });

    connection.on("disconnected", () => {
      console.log("Database disconnected");
    });

    const run = async () => {
      await mongoose.connect(process.env.MONGODB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    };
    run().catch(error => console.error(error));
  }


  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("\n\n\n\nAPI is running at http://localhost:%d", this.app.get("port"));
    });
  }

}

const server = new Server();
server.start();
