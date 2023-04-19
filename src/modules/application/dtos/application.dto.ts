import {
  IsObject,
  IsNotEmptyObject,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InsurerDto } from 'src/modules/insurer/dtos/insurer.dto';

export class ApplicationDto {
  /**
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => InsurerDto)
  readonly insurer: InsurerDto;
}
