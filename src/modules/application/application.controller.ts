import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApplicationDto } from './dtos/application.dto';
import { ApplicationService } from './application.service';

@Controller({ path: '' })
@ApiTags('Application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  /**
   * Submit application
   */
  @Post('/submit')
  @ApiOperation({ summary: 'Submit application' })
  async createApplication(@Body() applicationDto: ApplicationDto) {
    const response = await this.applicationService.submit(applicationDto);
    return response;
  }

  /**
   * Save application
   */
  @Post('/save')
  @ApiOperation({ summary: 'Save application' })
  async saveApplication(@Body() applicationDto: ApplicationDto) {
    const response = await this.applicationService.save(applicationDto);
    return response;
  }

  /**
   * Update application
   */
  @Put(':applicationId')
  @ApiOperation({ summary: 'Update application' })
  @ApiParam({ name: 'applicationId' })
  async update(
    @Param('applicationId', ParseUUIDPipe) applicationId: string,
    @Body() applicationDto: ApplicationDto,
  ) {
    const response = await this.applicationService.update(
      applicationId,
      applicationDto,
    );
    return response;
  }

  /**
   * Resume application
   */
  @Get('/resume/:applicationId')
  @ApiOperation({ summary: 'Resume application' })
  @ApiParam({ name: 'applicationId' })
  async resumeApplication(
    @Param('applicationId', ParseUUIDPipe) applicationId: string,
  ) {
    const application = await this.applicationService.findById(applicationId);
    return { application };
  }
}
