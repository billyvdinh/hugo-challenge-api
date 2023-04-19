import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InsurerEntity } from './entities/insurer.entity';
import { InsurerService } from './insurer.service';
import { InsurerController } from './insurer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InsurerEntity])],
  controllers: [InsurerController],
  providers: [InsurerService],
  exports: [InsurerService],
})
export class InsurerModule {}
