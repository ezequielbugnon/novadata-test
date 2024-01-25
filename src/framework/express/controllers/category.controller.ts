import { Request, Response } from "express";
import { CustomError } from "../../../core/common/error/custom.error";
import CategoryService from "../../../core/category/aplication/categories.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  };

  createCategory = (req: Request, res: Response) => {
    const { name } = req.body;

    this.categoryService
      .create(name)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  listCategory = (req: Request, res: Response) => {
    this.categoryService
    .list(false)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  };

  listCategoryWithPost = (req: Request, res: Response) => {
    this.categoryService
    .list(true)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  };

  deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;

    const categoryId = Number(id)

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    this.categoryService
    .delete(categoryId)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  };

  getOne = (req: Request, res: Response) => {
    const { id } = req.params;

    const categoryId = Number(id)

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    this.categoryService
    .getOne(categoryId)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  };
}
