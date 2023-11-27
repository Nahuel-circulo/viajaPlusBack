/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class SearchParamsDto {
  @IsOptional()
  @IsString()
  origen: string;
  
  @IsOptional()
  @IsString()
  destino: string;
}
