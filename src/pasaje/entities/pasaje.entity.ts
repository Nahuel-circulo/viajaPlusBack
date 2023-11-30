import { Ciudad } from "src/ciudades/entities/ciudad.entity";
import { Itinerario } from "src/itinerarios/entities/itinerario.entity";
import { Asiento } from "src/transportes/entities/asiento.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'factura_pasaje' })
export class Pasaje {

  @PrimaryGeneratedColumn('increment')
  nro_pasaje: number;


  @ManyToOne(type => Usuario, usuario => usuario.dni, {eager:true, cascade: true })
  usuario: Usuario;

  @ManyToOne(type => Itinerario, itinerario => itinerario.nro_itinerario, {eager:true, cascade: true })
  itinerario: Itinerario;

  @ManyToOne(type => Asiento, asiento => asiento.id, {eager:true, cascade: true })
  asiento: Asiento;

  @Column({
    type: 'varchar'
  })
  tipo_atencion: string;

  @Column('datetime')
  fecha_partida: string;

  @Column('datetime')
  fecha_llegada: string;


  @Column('datetime')
  vencimiento_reserva: string;

  @Column('float')
  precio_final: number;

  @ManyToOne(type => Ciudad, ciudad => ciudad.nro_Ciudad, {eager:true, cascade: true })
  tramo_ciudad_origen: Ciudad;

  @ManyToOne(type => Ciudad, ciudad => ciudad.nro_Ciudad, {eager:true, cascade: true })
  tramo_ciudad_destino: Ciudad;

  @Column({
    type: 'varchar',
    default:'Reservado'
  })
  estado: string;


}
