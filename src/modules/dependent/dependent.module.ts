import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DependentEntity } from './entities/dependent.entity';
import { DependentService } from './dependent.service';
import { DependentController } from './dependent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DependentEntity])],
  controllers: [DependentController],
  providers: [DependentService],
  exports: [DependentService],
})
export class DependentModule {}
