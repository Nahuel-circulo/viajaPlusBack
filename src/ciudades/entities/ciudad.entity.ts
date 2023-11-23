import { ItinerarioCiudad } from 'src/itinerarios/entities/itinerarioCiudad.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'ciudad' })
export class Ciudad {
  @PrimaryGeneratedColumn('increment')
  nro_Ciudad: number;

  @Column({
    type: 'varchar'
  })
  nombre: string;

  @OneToMany(
    () => ItinerarioCiudad,
    (itinerarioCiudad) => itinerarioCiudad.ciudad
  )
  @JoinTable()
  itinerarioCiudad: ItinerarioCiudad[];
}
