import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase, ItemsGroup } from "./index";

@Entity()
export class Item extends EntityBase {
  @Column()
  name: string;

  @Column()
  isChecked: boolean;
  
  @ManyToOne(() => ItemsGroup, (itemsGroup) => itemsGroup.items)
  itemsGroup: ItemsGroup;
}