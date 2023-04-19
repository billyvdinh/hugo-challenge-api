import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationEntity } from './entities/application.entities';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { InsurerEntity } from '../insurer/entities/insurer.entity';
import { DependentEntity } from '../dependent/entities/dependent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationEntity,
      InsurerEntity,
      DependentEntity,
      VehicleEntity,
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
