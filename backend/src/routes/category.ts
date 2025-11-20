// routes/category.routes.ts
import { Router, Application } from "express";
import { authMiddleware } from "../middleware/auth";
import { CategoryController } from "../controllers/category.controller";


export class CategoryRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/categories/public")
      .get(this.categoryController.getAllCategories)
      .post(this.categoryController.createCategory);

    app.route("/api/categories/public/:id")
      .get(this.categoryController.getCategoryById)
      .patch(this.categoryController.updateCategory)
      .delete(this.categoryController.deleteCategory);

    app.route("/api/categories/public/:id/logic")
      .delete(this.categoryController.deleteCategoryAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/categories")
      .get(authMiddleware, this.categoryController.getAllCategories)
      .post(authMiddleware, this.categoryController.createCategory);

    app.route("/api/categories/:id")
      .get(authMiddleware, this.categoryController.getCategoryById)
      .patch(authMiddleware, this.categoryController.updateCategory)
      .delete(authMiddleware, this.categoryController.deleteCategory);

    app.route("/api/categories/:id/logic")
      .delete(authMiddleware, this.categoryController.deleteCategoryAdv);
  }
}
