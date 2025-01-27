import { ICategoryRepository } from "../repositories/interfaces/category";
import { ICategoryService } from "./interfaces/category";

export class CategoryService implements ICategoryService {
  private readonly categoryRepository: ICategoryRepository;

  constructor(CategoryRepository: ICategoryRepository) {
    this.categoryRepository = CategoryRepository;
  }
}