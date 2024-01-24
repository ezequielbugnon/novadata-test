import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { AuthController } from '../controllers/auth.controller';
import UserService from '../../../core/users/aplication/users.service';
import UserRepositoryPrisma from '../../../core/users/infrastructure/users.repository';
import { JwtAdapter } from '../../../libs/jwt';
import CategoryService from '../../../core/category/aplication/categories.service';
import CategoryRepositoryPrisma from '../../../core/category/infrastructure/categories.repository';
import { CategoryController } from '../controllers/category.controller';
import { AuthMiddleware } from '../controllers/midleware';
import PostRepositoryPrisma from '../../../core/posts/infrastructure/posts.repository';
import PostService from '../../../core/posts/aplication/posts.service';
import { PostController } from '../controllers/post.controller';

export class AppRoutesExpress {

  constructor(){}

  static get routes(): Router {

    const router = Router();
    const repository = new UserRepositoryPrisma()
    const categoryRepository = new CategoryRepositoryPrisma()
    const postRepository = new PostRepositoryPrisma()

    const jwt = JwtAdapter.generateToken

    const userService = new UserService(repository, jwt)
    const categoryService = new CategoryService(categoryRepository)
    const postService = new PostService(postRepository)

    const authController = new AuthController(userService)
    const categoryController = new CategoryController(categoryService)
    const postController = new PostController(postService)

    router.post('/api/v1/register', authController.registerUser)
    router.post('/api/v1/login', authController.loginUser)

    router.post('/api/v1/category/create', [AuthMiddleware.validateJWT], categoryController.createCategory)
    router.get('/api/v1/category/list', categoryController.listCategory)
    router.get('/api/v1/category/list/:id', categoryController.getOne)
    router.get('/api/v1/category/list-with-posts', categoryController.listCategoryWithPost)
    router.delete('/api/v1/category/delete/:id',[AuthMiddleware.validateJWT], categoryController.deleteCategory)

    router.post('/api/v1/post/create', [AuthMiddleware.validateJWT], postController.createPost)
    router.get('/api/v1/post/by-user', [AuthMiddleware.validateJWT], postController.listAllPostByUser)
    router.get('/api/v1/post', postController.listAll)
    router.get('/api/v1/post/get-one-by-id/:id', postController.getOne)
    router.delete('/api/v1/post/delete/:id', [AuthMiddleware.validateJWT], postController.deleteOne)
    router.put('/api/v1/post/update/:id', [AuthMiddleware.validateJWT], postController.updatePost)

    router.get('/api/v1/post/clear-cache', postController.clearCache)

    router.use('/api/v1/api-docs', swaggerUi.serve);
    router.get('/api/v1/api-docs', swaggerUi.setup(swaggerDocument));

    return router;
  }
}