import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityBase, Category, ItemsGroup } from "./index";

@Entity()
export class User extends EntityBase {
  @Column({ unique: true })
  email: string;
  
  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column({ type: "varchar", nullable: true })
  verificationCode: string | null;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => ItemsGroup, (itemsGroup) => itemsGroup.user)
  itemsGroups: ItemsGroup[];
}