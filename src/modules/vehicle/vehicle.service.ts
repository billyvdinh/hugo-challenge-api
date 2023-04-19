import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleDto } from './dtos/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepo: Repository<VehicleEntity>,
  ) {}

  /**
   * Get vehicle by id
   */
  async findById(id: string) {
    const vehicle = await this.vehicleRepo.findOne({
      where: { id },
    });
    return vehicle;
  }

  /**
   * Create vehicle
   */
  async create(vehicleDto: VehicleDto) {
    const vehicle = await this.vehicleRepo.save(
      this.vehicleRepo.create({
        ...vehicleDto,
      }),
    );

    return vehicle;
  }

  /**
   * Update vehicle
   */
  async update(vehicleDto: VehicleDto) {
    const vehicle = await this.vehicleRepo.save(
      this.vehicleRepo.create({
        ...vehicleDto,
      }),
    );

    return vehicle;
  }
}
