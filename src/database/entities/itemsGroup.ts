import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { EntityBase, Item, User } from "./index";

@Entity()
export class ItemsGroup extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.itemsGroups)
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Item, (item) => item.itemsGroup)
  items: Item[];
}