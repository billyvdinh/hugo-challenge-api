import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

import { RelationshipEnum } from '../dependent.types';

export class DependentDto {
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
   * @example spouse
   */
  @IsNotEmpty()
  @IsEnum(RelationshipEnum)
  readonly relationship: RelationshipEnum;
}
