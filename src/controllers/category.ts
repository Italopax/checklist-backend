import { ICategoryService } from "../services/interfaces/category";
import { ICategoryController } from "./interfaces/category";

export class CategoryController implements ICategoryController {
  private readonly categoryService: ICategoryService;

  constructor(CategoryService: ICategoryService) {
    this.categoryService = CategoryService;
  }
}