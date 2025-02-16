import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: false, type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, type: "timestamptz" })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: false, type: "timestamptz" })
  deletedAt: Date;
}
