import { IsNumber, IsIn } from 'class-validator';
export class CreateTransporteDto {
  @IsIn(['Cama', 'Semi Cama', 'Comun'])
  categoria: string;
  @IsNumber()
  cant_Asiento: number;
  @IsNumber()
  cant_Pisos: number;
}
