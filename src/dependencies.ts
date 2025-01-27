import { IUserController } from "./controllers/interfaces/user";
import { UserController } from "./controllers/user";
import { IUserRepository } from "./repositories/interfaces/user";
import { UserRepository } from "./repositories/user";
import { IUserService } from "./services/interfaces/user";
import { UserService } from "./services/user";

interface IDependencies {
  userRepository: IUserRepository;
  userService: IUserService;
  userController: IUserController;
}

class Dependencies implements IDependencies {
  static dependenciesInstance: Dependencies;

  public userRepository: IUserRepository;
  public userService: IUserService;
  public userController: IUserController;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
    this.userController = new UserController(this.userService);
  }

  static getInstance = (): Dependencies => {
    if (this.dependenciesInstance) return this.dependenciesInstance;

    this.dependenciesInstance = new Dependencies();
    return this.dependenciesInstance;
  }
}

export default Dependencies;