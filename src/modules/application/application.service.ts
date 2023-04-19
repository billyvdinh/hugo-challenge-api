import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationDto } from './dtos/application.dto';
import { ApplicationEntity } from './entities/application.entities';
import { InsurerEntity } from '../insurer/entities/insurer.entity';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { DependentEntity } from '../dependent/entities/dependent.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepo: Repository<ApplicationEntity>,
    @InjectRepository(InsurerEntity)
    private insurerRepo: Repository<InsurerEntity>,
    @InjectRepository(VehicleEntity)
    private vehicleRepo: Repository<VehicleEntity>,
    @InjectRepository(DependentEntity)
    private dependentRepo: Repository<DependentEntity>,
  ) {}

  /**
   * Get application by id
   */
  async findById(id: string) {
    const application = await this.applicationRepo.findOne({
      where: { id },
      // relations: ['insurer'],
    });
    return application;
  }

  /**
   * Update application by id
   */
  async update(id: string, applicationDto: ApplicationDto) {
    const application = await this.findById(id);

    const insurer = await this.insurerRepo.save(
      instanceToPlain(applicationDto.insurer),
    );

    const updatedApplication = await this.applicationRepo.save({
      ...instanceToPlain(applicationDto),
      id: application.id,
      insurer,
    });

    return updatedApplication;
  }

  /**
   * Save application
   */
  async save(applicationDto: ApplicationDto) {
    const insurer = await this.insurerRepo.save(
      instanceToPlain(applicationDto.insurer),
    );

    const application = await this.applicationRepo.save({
      ...instanceToPlain(applicationDto),
      insurer,
    });

    return { application, resume: `resume/${application.id}` };
  }

  /**
   * Submit application
   */
  async submit(applicationDto: ApplicationDto) {
    const application = await this.save(applicationDto);
    const price = Math.round(Math.random() * 100 * 100) / 100;
    return { application, price };
  }
}
