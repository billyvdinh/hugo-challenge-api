import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class VehicleDto {
  /**
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @IsOptional()
  @IsString()
  readonly id?: string;

  /**
   * @example 4Y1SL65848Z411439
   */
  @IsNotEmpty()
  @IsString()
  @Length(17)
  readonly VIN: string;

  /**
   * @example 2023
   */
  @IsNotEmpty()
  @IsInt()
  @Min(1985)
  @Max(2100)
  readonly year: number;

  /**
   * @example Nissan
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly make: string;

  /**
   * @example Altima
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly model: string;
}
