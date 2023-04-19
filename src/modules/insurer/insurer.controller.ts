import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { InsurerService } from './insurer.service';

@Controller({ path: '' })
@ApiTags('Insurer')
export class InsurerController {
  constructor(private insurerService: InsurerService) {}
}
