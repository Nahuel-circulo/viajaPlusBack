import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";

export class CreatePasajeDto {

  @IsNumber()
  usuario:number

  @IsNumber()
  itinerario:number

  @IsNumber()
  asiento:number

  @IsNumber()
  tramo_ciudad_origen:number

  @IsNumber()
  tramo_ciudad_destino:number

  @IsIn(['Comun','Ejecutivo'])
  tipo_atencion:string

  @IsDateString()
  fecha_partida: string;

  @IsDateString()
  fecha_llegada: string;

  @IsDateString()
  vencimiento_reserva: string;

  @IsNumber()
  precio_final: number;

  @IsIn(['Reservado','Cancelado','Pagado'])
  estado: string;

}
