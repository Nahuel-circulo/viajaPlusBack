import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('usuario')
export class Usuario {

  @PrimaryColumn({
    type: 'int',
  })
  dni: number

  @Column({
    type: 'varchar', unique: true
  })
  email: string

  @Column({
    type: 'varchar'
  })
  nombreCompleto: string


  @Column({
    type: 'varchar'
  })
  password: string

}
