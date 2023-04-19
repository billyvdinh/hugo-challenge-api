import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { instanceToPlain } from 'class-transformer';
import { RelationshipEnum } from '../dependent.types';

import { InsurerEntity } from 'src/modules/insurer/entities/insurer.entity';

@Entity({ name: 'dependents' })
export class DependentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: RelationshipEnum,
  })
  relationship: RelationshipEnum;

  @ManyToOne(() => InsurerEntity, (insurer) => insurer.dependents)
  @JoinColumn()
  insurer: InsurerEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
