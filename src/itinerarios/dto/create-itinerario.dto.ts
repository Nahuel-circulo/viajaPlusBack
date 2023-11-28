import { IsArray, IsDateString, IsNumber } from 'class-validator';

interface CiudadAndRol {
  nro_ciudad: number;
  rol: 'Ciudad Origen' | 'Ciudad Destino' | 'Ciudad Intermedia';
}
export class CreateItinerarioDto {
  @IsDateString()
  fech_partida: string;

  @IsDateString()
  fech_llegada: string;

  @IsNumber()
  costo_base: number;

  @IsNumber()
  nro_transporte: number;

  @IsArray()
  itinerarioCiudad: CiudadAndRol[];
}
