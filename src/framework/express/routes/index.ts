import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import UserService from '../../../core/users/aplication/users.service';
import UserRepositoryPrisma from '../../../core/users/infrastructure/users.repository';
import { JwtAdapter } from '../../../libs/jwt';
import CategoryService from '../../../core/category/aplication/categories.service';
import CategoryRepositoryPrisma from '../../../core/category/infrastructure/categories.repository';
import { CategoryController } from '../controllers/category.controller';

export class AppRoutesExpress {

  constructor(){}

  static get routes(): Router {

    const router = Router();
    const repository = new UserRepositoryPrisma()
    const categoryRepository = new CategoryRepositoryPrisma()
    const jwt = JwtAdapter.generateToken
    const userService = new UserService(repository, jwt)
    const categoryService = new CategoryService(categoryRepository)
    const authController = new AuthController(userService)
    const categoryController = new CategoryController(categoryService)

    router.post('/api/v1/register', authController.registerUser)
    router.post('/api/v1/login', authController.loginUser)

    router.post('/api/v1/category/create', categoryController.createCategory)
    router.get('/api/v1/category/list', categoryController.listCategory)
    router.get('/api/v1/category/list/:id', categoryController.getOne)
    router.get('/api/v1/category/list-with-posts', categoryController.listCategoryWithPost)
    router.delete('/api/v1/category/delete/:id', categoryController.deleteCategory)

    return router;
  }
}