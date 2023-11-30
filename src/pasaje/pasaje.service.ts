import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePasajeDto } from './dto/create-pasaje.dto';
import { UpdatePasajeDto } from './dto/update-pasaje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pasaje } from './entities/pasaje.entity';
import { In, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { Asiento } from 'src/transportes/entities/asiento.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Itinerario } from 'src/itinerarios/entities/itinerario.entity';

@Injectable()
export class PasajeService {

  constructor(
    @InjectRepository(Pasaje)
    private readonly pasajeRepository: Repository<Pasaje>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Asiento)
    private readonly asientoRepository: Repository<Asiento>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Itinerario)
    private readonly itinerarioRepository: Repository<Itinerario>,
  ) { }

  async create(createPasajeDto: CreatePasajeDto) {

    const { fecha_llegada, fecha_partida, precio_final, tipo_atencion, estado,vencimiento_reserva } = createPasajeDto;
    const pasaje = await this.pasajeRepository.create({
      fecha_llegada, fecha_partida, precio_final, tipo_atencion, estado,vencimiento_reserva
    })
    //busco el usuario
    const usuario = await this.usuarioRepository.findOne({
      where: {
        dni: createPasajeDto.usuario
      }
    })
    //busco ciudades
    const tramo_ciudad_destino = await this.ciudadRepository.findOne({
      where: {
        nro_Ciudad: createPasajeDto.tramo_ciudad_destino
      }
    })

    const tramo_ciudad_origen = await this.ciudadRepository.findOne({
      where: {
        nro_Ciudad: createPasajeDto.tramo_ciudad_origen
      }
    })

    // busco asiento
    const asiento = await this.asientoRepository.findOne({
      where: {
        nro_asiento: createPasajeDto.asiento
      }
    })

    // busco itinerario
    const itinerario = await this.itinerarioRepository.findOne({
      where: {
        nro_itinerario: createPasajeDto.itinerario
      }
    })

    pasaje.usuario = usuario;
    pasaje.tramo_ciudad_destino = tramo_ciudad_destino;
    pasaje.tramo_ciudad_origen = tramo_ciudad_origen;
    pasaje.asiento = asiento;
    pasaje.itinerario = itinerario;
    await this.pasajeRepository.save(pasaje)


    return pasaje
  }

  async findAll() {
    return this.pasajeRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} pasaje`;
  }

  async findAllByUser(dni: number) {
    const pasajes = await this.pasajeRepository.find({
      where:{
        usuario:{
          dni
        }
      }
    })
    if (!pasajes.length) {
       throw new NotFoundException('No hay pasajes pertenecientes a ese usuario')
    }
    return pasajes
  }

  async findAsientosByItinerarios(nro_itinerario: number) {

    const pasajes = await this.pasajeRepository.find({
      select:{
        asiento:{
          nro_asiento: true
        }
      },
      where:{
        itinerario:{
          nro_itinerario
        },
        estado: In(['reservado', 'pagado'])
      }
    })
    if (!pasajes.length) {
      throw new NotFoundException('No hay asientos reservados para ese itinerario')
    }
    const asientos = pasajes.map(pasaje => pasaje.asiento.id)
    return asientos

  }
  async update(id: number, updatePasajeDto: UpdatePasajeDto) {
    const {estado} = updatePasajeDto
    await this.pasajeRepository.update(id, {estado})
    return 'Pasaje Actualizado'
  }

  remove(id: number) {
    return `This action removes a #${id} pasaje`;
  }
}
