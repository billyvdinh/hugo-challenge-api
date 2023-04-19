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
import { InsurerEntity } from 'src/modules/insurer/entities/insurer.entity';

@Entity({ name: 'vehicles' })
export class VehicleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  VIN: string;

  @Column({ nullable: false })
  year: number;

  @Column({ nullable: false })
  make: string;

  @Column({ nullable: false })
  model: string;

  @ManyToOne(() => InsurerEntity, (insurer) => insurer.vehicles)
  @JoinColumn()
  insurer: InsurerEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
