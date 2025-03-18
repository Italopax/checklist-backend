import { AuthController } from "./controllers/auth";
import { IAuthController } from "./controllers/interfaces/auth";

import { CategoryController } from "./controllers/category";
import { ICategoryController } from "./controllers/interfaces/category";

import { ItemController } from "./controllers/item";
import { IItemController } from "./controllers/interfaces/item";

import { ItemsGroupController } from "./controllers/itemsGroup";
import { IItemsGroupController } from "./controllers/interfaces/itemsGroup";

import { UserController } from "./controllers/user";
import { IUserController } from "./controllers/interfaces/user";

import { CategoryRepository } from "./repositories/category";
import { ICategoryRepository } from "./repositories/interfaces/category";

import { ItemRepository } from "./repositories/item";
import { IItemRepository } from "./repositories/interfaces/item";

import { UserRepository } from "./repositories/user";
import { IUserRepository } from "./repositories/interfaces/user";

import { ItemsGroupRepository } from "./repositories/itemsGroup";
import { IItemsGroupRepository } from "./repositories/interfaces/itemsGroup";

import { AuthService } from "./services/auth";
import { IAuthService } from "./services/interfaces/auth";

import { CategoryService } from "./services/category";
import { ICategoryService } from "./services/interfaces/category";

import { UserService } from "./services/user";
import { IUserService } from "./services/interfaces/user";

import { ItemService } from "./services/item";
import { IItemService } from "./services/interfaces/item";

import { ItemsGroupService } from "./services/itemsGroup";
import { IItemsGroupService } from "./services/interfaces/itemsGroup";

interface IDependencies {
  userRepository: IUserRepository;
  userService: IUserService;
  userController: IUserController;

  itemRepository: IItemRepository;
  itemService: IItemService;
  itemController: IItemController;

  itemsGroupRepository: IItemsGroupRepository;
  itemsGroupService: IItemsGroupService;
  itemsGroupController: IItemsGroupController;

  catetoryRepository: ICategoryRepository;
  categoryService: ICategoryService;
  categoryController: ICategoryController;

  authController: IAuthController;
  authService: IAuthService;
}

class Dependencies implements IDependencies {
  static dependenciesInstance: Dependencies;

  public userRepository: IUserRepository;
  public userService: IUserService;
  public userController: IUserController;

  public itemRepository: IItemRepository;
  public itemService: IItemService;
  public itemController: IItemController;

  public itemsGroupRepository: ItemsGroupRepository;
  public itemsGroupService: IItemsGroupService;
  public itemsGroupController: IItemsGroupController;

  public catetoryRepository: ICategoryRepository;
  public categoryService: ICategoryService;
  public categoryController: ICategoryController;

  public authController: IAuthController;
  public authService: IAuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
    this.userController = new UserController(this.userService);

    this.itemRepository = new ItemRepository();
    this.itemService = new ItemService(this.itemRepository);
    this.itemController = new ItemController(this.itemService);

    this.itemsGroupRepository = new ItemsGroupRepository();
    this.itemsGroupService = new ItemsGroupService(this.itemsGroupRepository);
    this.itemsGroupController = new ItemsGroupController(this.itemsGroupService);

    this.catetoryRepository = new CategoryRepository();
    this.categoryService = new CategoryService(this.catetoryRepository);
    this.categoryController = new CategoryController(this.categoryService);
    
    this.authService = new AuthService(this.userRepository);
    this.authController = new AuthController(this.authService);
  }

  static getInstance = (): Dependencies => {
    if (this.dependenciesInstance) return this.dependenciesInstance;

    this.dependenciesInstance = new Dependencies();
    return this.dependenciesInstance;
  }
}

export default Dependencies;