import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateJWT } from "../middleware/authenticateJWT";

export class UserRoutes {
  public router: Router
  public userController: UserController = new UserController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes(): void {
    this.router.get("/", authenticateJWT, this.userController.getCurrentUser)
    this.router.get("/presentations", authenticateJWT, this.userController.getUserPresentations)
  }
}
