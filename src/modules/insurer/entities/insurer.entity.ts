import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { instanceToPlain } from 'class-transformer';

import { StateEnum } from '../insurer.types';
import { ApplicationEntity } from 'src/modules/application/entities/application.entities';
import { VehicleEntity } from 'src/modules/vehicle/entities/vehicle.entity';
import { DependentEntity } from 'src/modules/dependent/entities/dependent.entity';

@Entity({ name: 'insurers' })
export class InsurerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  city: string;

  @Column({
    type: 'enum',
    enum: StateEnum,
  })
  state: StateEnum;

  @Column({ nullable: false })
  zipCode: string;

  @OneToMany(() => VehicleEntity, (vehicle) => vehicle.insurer, {
    cascade: true,
    eager: true,
  })
  vehicles: VehicleEntity[];

  @OneToMany(() => DependentEntity, (dependent) => dependent.insurer, {
    cascade: true,
    eager: true,
  })
  dependents: DependentEntity[];

  @OneToOne(() => ApplicationEntity, (application) => application.insurer)
  @JoinColumn()
  application: ApplicationEntity;

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
