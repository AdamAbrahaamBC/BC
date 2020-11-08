import { Router } from "express";
import { PresentationController } from "../controllers/presentationController";
import { authenticateJWT } from "../middleware/authenticateJWT";

export class PresentationRoutes {
  public router: Router
  public presentationController: PresentationController = new PresentationController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes(): void {
    this.router.post("/", authenticateJWT, this.presentationController.save)
    this.router.get("/", authenticateJWT, this.presentationController.get)
    this.router.delete("/", authenticateJWT, this.presentationController.delete)
  }
}
