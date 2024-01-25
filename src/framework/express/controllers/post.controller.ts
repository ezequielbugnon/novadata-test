import { Request, Response } from "express";
import { CustomError } from "../../../core/common/error/custom.error";
import { uploadImage } from "../../../libs/cloudinary";
import PostService from "../../../core/posts/aplication/posts.service";
import fs from "fs-extra";
import { UploadedFile } from "express-fileupload";

export class PostController {
  constructor(private readonly postService: PostService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }

  createPost = (req: Request, res: Response) => {
    const { title, content, categoryId, user } = req.body;
    let image: string;
    const imageFile = req.files?.image as UploadedFile;

    if (!imageFile || !this.isValidImage(imageFile)) {
      fs.unlink(imageFile.tempFilePath);
      return res.status(400).json({ error: "Invalid or missing image file" });
    }

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: "Invalid categoryId provided" });
    }

    const categoryID = Number(categoryId);
    uploadImage(imageFile.tempFilePath)
      .then((result) => {
        image = result.secure_url;
        return fs.unlink(imageFile.tempFilePath);
      })
      .then(() => {
        const post = {
          title,
          content,
          categoryId: categoryID,
          image,
          authorId: user.id,
        };

        return this.postService.create(post);
      })
      .then((data) => res.json(data))
      .catch(async (error) => {
        this.handleError(error, res);
      });
  };

  listAllPostByUser = (req: Request, res: Response) => {
    const { user } = req.body

    this.postService
    .listAllByUser(user.id)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  listAll = (req: Request, res: Response) => {
    this.postService
    .listAll()
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  getOne = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid Id provided" });
    }

    const ID = Number(id);

    this.postService
    .getOne(ID)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  deleteOne = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid Id provided" });
    }

    const ID = Number(id);

    this.postService
    .delete(ID)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid Id provided" });
    }

    const ID = Number(id);

    const updatePost = {
      id: ID,
      title,
      content,
    }

    this.postService
    .updatePost(updatePost)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  clearCache = (req: Request, res: Response) => {
    this.postService
    .clearCache()
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  private isValidImage(file: UploadedFile): boolean {
    if (!file) {
      return false;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    const fileExtension = file.name.split(".").pop();
    const isExtensionValid = allowedExtensions.includes(
      fileExtension?.toLowerCase() || ""
    );

    const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

    return isExtensionValid && isMimeTypeValid;
  }
}
