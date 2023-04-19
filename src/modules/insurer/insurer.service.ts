import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InsurerEntity } from './entities/insurer.entity';

@Injectable()
export class InsurerService {
  constructor(
    @InjectRepository(InsurerEntity)
    private insurerRepo: Repository<InsurerEntity>,
  ) {}
}
