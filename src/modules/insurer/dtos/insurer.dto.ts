import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  Length,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { StateEnum } from '../insurer.types';

import { VehicleDto } from 'src/modules/vehicle/dtos/vehicle.dto';
import { DependentDto } from 'src/modules/dependent/dtos/dependent.dto';

export class InsurerDto {
  /**
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @IsOptional()
  @IsString()
  readonly id?: string;

  /**
   * @example Jack
   */
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  /**
   * @example Smith
   */
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  /**
   * @example 1990-01-01
   */
  @IsNotEmpty()
  @IsDateString()
  readonly dateOfBirth: Date;

  /**
   * @example Mrs Smith 813 Howard Street
   */
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  /**
   * @example Oswego
   */
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  /**
   * @example NY
   */
  @IsNotEmpty()
  @IsEnum(StateEnum)
  readonly state: StateEnum;

  /**
   * @example 13126
   */
  @IsNotEmpty()
  @IsString()
  @Length(5)
  readonly zipCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DependentDto)
  readonly dependents: DependentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleDto)
  readonly vehicles: VehicleDto[];
}
