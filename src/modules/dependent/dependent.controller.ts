import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { DependentService } from './dependent.service';

@Controller({ path: '' })
@ApiTags('Dependent')
export class DependentController {
  constructor(private dependentService: DependentService) {}
}
