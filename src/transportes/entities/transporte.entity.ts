import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asiento } from './asiento.entity';

@Entity({ name: 'unidad_transporte' })
export class Transporte {
  @PrimaryGeneratedColumn('increment')
  nro_transporte: number;

  @Column({
    type: 'int'
  })
  cant_Pisos: number;

  @Column({
    type: 'varchar'
  })
  categoria: string;

  @Column({
    type: 'int'
  })
  cant_Asiento: number;


  @OneToMany(() => Asiento, asiento => asiento.transporte,{
    eager: true,
    cascade: true,
  })
   asientos: Asiento[];
}
