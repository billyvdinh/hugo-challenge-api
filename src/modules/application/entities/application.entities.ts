import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { instanceToPlain } from 'class-transformer';
import { InsurerEntity } from 'src/modules/insurer/entities/insurer.entity';

@Entity({ name: 'applications' })
export class ApplicationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => InsurerEntity, (insurer) => insurer.application, {
    cascade: true,
    eager: true,
  })
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
