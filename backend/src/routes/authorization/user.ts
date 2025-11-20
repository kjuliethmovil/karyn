import { Application } from "express";
import { UserController } from '../../controllers/authorization/user.controller';

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    app.route("/api/users")
      .get(this.userController.getAllUsers)
      .post(this.userController.createUser);
  }
}
