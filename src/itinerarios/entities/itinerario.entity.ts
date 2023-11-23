import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Ciudad } from '../../ciudades/entities/ciudad.entity';
import { ItinerarioCiudad } from './itinerarioCiudad.entity';
import { Transporte } from 'src/transportes/entities/transporte.entity';

@Entity()
export class Itinerario {
  @PrimaryGeneratedColumn('increment')
  nro_itinerario: number;

  @Column('datetime')
  fech_partida: string;

  @Column('datetime')
  fech_llegada: string;

  @Column('float')
  costo_base: number;

  @OneToMany(
    () => ItinerarioCiudad,
    (itinerarioCiudad) => itinerarioCiudad.itinerario,
    { eager: true }
  )
  @JoinColumn()
  itinerarioCiudad: ItinerarioCiudad[];

  @ManyToOne(() => Transporte, (transporte) => transporte.nro_transporte, {
    eager: true
  })
  @JoinColumn({ name: 'nro_transporte' })
  transporte: Transporte;
}
