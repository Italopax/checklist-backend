import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamptz", { nullable: true })
  createdAt: Date;

  @Column("timestamptz", { nullable: true })
  deletedAt: Date;
}
