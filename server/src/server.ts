import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from 'body-parser';

import { AuthRoutes } from "./routes/authRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { PresentationRoutes } from "./routes/presentationRoutes";

class Server {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes()
    this.database();
  }

  public config(): void {
    this.app.set("port", 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    dotenv.config()
    //this.app.use(compression());
    this.app.use(cors());
  }

  public routes(): void {
    this.app.use("/api/auth", new AuthRoutes().router)
    this.app.use("/api/user", new UserRoutes().router)
    this.app.use("/api/presentation", new PresentationRoutes().router)
  }

  public database(): void {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected")
    })

    connection.on("disconnected", () => {
      console.log("Database disconnected")
    })

    const run = async () => {
      await mongoose.connect(process.env.MONGODB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
    }
    run().catch(error => console.error(error))
  }


  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("\n\n\n\nAPI is running at http://localhost:%d", this.app.get("port"))
    })
  }
}

const server = new Server()
server.start()
