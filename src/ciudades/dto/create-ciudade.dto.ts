import { IsString } from 'class-validator';

export class CreateCiudadeDto {
  @IsString()
  nombre: string;
}
