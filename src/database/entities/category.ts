import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase } from "./index";
import { User } from "./index";

@Entity()
export class Category extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}