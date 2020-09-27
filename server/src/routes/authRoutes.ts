import { Router } from "express";
import { AuthController } from "../controllers/authController";

export class AuthRoutes {
  public router: Router
  public authController: AuthController = new AuthController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes(): void {
    this.router.post("/register", this.authController.register)
    this.router.post("/login", this.authController.login)
  }
}
