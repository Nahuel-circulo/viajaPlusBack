import {
  Get,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Itinerario } from './entities/itinerario.entity';
import { SearchParamsDto } from '../common/dto/searchParams.dto';

@Injectable()
export class ItinerariosService {
  private readonly logger = new Logger('ItinerariosService');
  constructor(
    @InjectRepository(Itinerario)
    private readonly ItinerarioRepository: Repository<Itinerario>
  ) {}

  async create(createItinerarioDto: CreateItinerarioDto) {
    try {
      const itinerario = this.ItinerarioRepository.create(createItinerarioDto);
      await this.ItinerarioRepository.save(itinerario);
      return itinerario;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Ayudaaa');
    }
  }

  @Get()
  async findAll(searchParamsDto: SearchParamsDto) {
    const { destino, origen } = searchParamsDto;

    // busca los itinerarios que incluyan las ciudades origen y destino.
    const itinerariosIncludesCities = await this.ItinerarioRepository.find({
      where: {
        itinerarioCiudad: {
          ciudad: {
            nombre: In([origen, destino])
          }
        }
      }
    });

    const validsItinerariosId = itinerariosIncludesCities.map((itinerario) => {
      const { itinerarioCiudad } = itinerario;
      // ordena las ciudades por orden ascendente (Orden del recorrido).
      itinerarioCiudad.sort((a, b) => a.orden - b.orden);

      // retorna el nro de itinerario si las ciudades origen y destino son iguales.
      if (
        itinerarioCiudad[0].ciudad.nombre === origen &&
        itinerarioCiudad[1].ciudad.nombre === destino
      ) {
        return itinerario.nro_itinerario;
      }
    });

    return this.ItinerarioRepository.find({
      where: {
        nro_itinerario: In(validsItinerariosId)
      }
    });
  }

  @Get(':id')
  findOne(id: number) {
    return this.ItinerarioRepository.findOne({
      where: { nro_itinerario: id }
    });
  }

  update(id: number, updateItinerarioDto: UpdateItinerarioDto) {
    return `This action updates a #${id} itinerario`;
  }

  remove(id: number) {
    return `This action removes a #${id} itinerario`;
  }
}
