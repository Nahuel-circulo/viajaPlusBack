import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Transporte } from './transporte.entity';


@Entity('asiento')
export class Asiento{

  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  nro_asiento: number;

  @ManyToOne(() => Transporte, transporte => transporte.asientos, {onDelete: 'CASCADE'}  )
  transporte: Transporte

}