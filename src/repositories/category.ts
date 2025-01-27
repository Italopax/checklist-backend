import { Repository } from "typeorm";
import { ICategoryRepository } from "./interfaces/category";
import { Category } from "../database/entities";
import { AppDataSource } from "../database";

export class CategoryRepository implements ICategoryRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }
}