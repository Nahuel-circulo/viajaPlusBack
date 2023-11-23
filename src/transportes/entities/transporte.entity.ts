import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
