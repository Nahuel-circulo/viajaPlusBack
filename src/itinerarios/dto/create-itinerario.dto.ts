import { IsDateString, IsNumber } from 'class-validator';

export class CreateItinerarioDto {
  @IsDateString()
  fech_partida: string;

  @IsDateString()
  fech_llegada: string;

  @IsNumber()
  costo_base: number;

  @IsNumber()
  nro_transporte: number;
}
