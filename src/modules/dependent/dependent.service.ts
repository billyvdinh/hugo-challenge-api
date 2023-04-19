import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DependentEntity } from './entities/dependent.entity';

@Injectable()
export class DependentService {
  constructor(
    @InjectRepository(DependentEntity)
    private dependentRepo: Repository<DependentEntity>,
  ) {}
}
