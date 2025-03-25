import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase, ItemsGroup } from "./index";

@Entity()
export class Item extends EntityBase {
  @Column()
  name: string;

  @Column({ default: false })
  isChecked: boolean;

  @Column()
  itemsGroupId: number;
  
  @ManyToOne(() => ItemsGroup, (itemsGroup) => itemsGroup.items)
  itemsGroup: ItemsGroup;
}