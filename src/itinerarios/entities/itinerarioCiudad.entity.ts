/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Itinerario } from './itinerario.entity';
import { Ciudad } from '../../ciudades/entities/ciudad.entity';

@Entity({name:'itinerariociudad'})
export class ItinerarioCiudad {
  @PrimaryGeneratedColumn('increment')
 id: number;
  
  @ManyToOne(() => Itinerario, (itinerario) => itinerario.itinerarioCiudad,{
    cascade:['insert','remove','update'],onDelete:'CASCADE'
  })
  itinerario: Itinerario;
  
  @ManyToOne(() => Ciudad, (ciudad) => ciudad.itinerarioCiudad,{eager:true,cascade:['insert']})
  @JoinTable()
  ciudad: Ciudad;

  @Column({
    type: 'int'
  })
  orden: number;

  @Column({
    type:'varchar'
  })
  rol: string;

  @Column({
    type:'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  hor_partida:string;
}
