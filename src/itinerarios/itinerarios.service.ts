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
import { Transporte } from '../transportes/entities/transporte.entity';
import { ItinerarioCiudad } from './entities/itinerarioCiudad.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';


@Injectable()
export class ItinerariosService {
  private readonly logger = new Logger('ItinerariosService');
  constructor(
    @InjectRepository(Itinerario)
    private readonly ItinerarioRepository: Repository<Itinerario>,
    @InjectRepository(Transporte)
    private readonly TransporteRepository: Repository<Transporte>,
    @InjectRepository(Ciudad)
    private readonly CiudadRepository: Repository<Ciudad>,
    @InjectRepository(ItinerarioCiudad)
    private readonly itinerarioCiudadRepository: Repository<ItinerarioCiudad>
  ) { }

  async create(createItinerarioDto: CreateItinerarioDto) {
    try {
      const { nro_transporte, itinerarioCiudad } = createItinerarioDto;


      // crea el itinerario y le asigna el transporte.
      const itinerario = this.ItinerarioRepository.create(createItinerarioDto);

      const trasporte = await this.TransporteRepository.findOne({
        where: {
          nro_transporte
        }
      });

      itinerario.transporte = trasporte;




      const itinerarioCiudadToInsert = itinerarioCiudad.map(async (itinerarioCiudad, index) => {

        const ciudad = await this.CiudadRepository.findOne({
          where: {
            nro_Ciudad: itinerarioCiudad.nro_ciudad
          }
        });

        const itinerarioCiudadToInsert = await this.itinerarioCiudadRepository.create({
          orden: index + 1,
          rol: itinerarioCiudad.rol,
          ciudad,
        });

        return itinerarioCiudadToInsert;

      })

      const result = await Promise.all(itinerarioCiudadToInsert)

      console.log('itinerarioCiudadToInsert ', result);


      itinerario.itinerarioCiudad = result;

      console.log('lo que muestra ', itinerario);

      const insertedItinerario = await this.ItinerarioRepository.save(itinerario);





      console.log('inserted ', insertedItinerario);
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

    if (destino && origen) {
      const itinerariosIncludesCities = await this.ItinerarioRepository.find({
        where: {
          itinerarioCiudad: {
            ciudad: {
              nombre: In([origen, destino])
            }
          }
        }
      });

      //como comprobar si itinerariosIncludesCities tiene ambas ciudades?



      const validsItinerariosId = itinerariosIncludesCities.map(
        (itinerario) => {
          const { itinerarioCiudad } = itinerario;
          // ordena las ciudades por orden ascendente (Orden del recorrido).
          itinerarioCiudad.sort((a, b) => a.orden - b.orden);

          if (itinerarioCiudad.length >= 2) {
            // retorna el nro de itinerario si las ciudades origen y destino son iguales.
            if (
              itinerarioCiudad[0].ciudad.nombre === origen &&
              itinerarioCiudad[1].ciudad.nombre === destino
            ) {
              return itinerario.nro_itinerario;
            }
          }
          return null; // retorna null si no encuentra el itinerario.
        }
      );

      return this.ItinerarioRepository.find({
        where: {
          nro_itinerario: In(validsItinerariosId)
        }
      });
    } else {
      const itinerarios = await this.ItinerarioRepository.find();
      return itinerarios;
    }
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
    this.ItinerarioRepository.delete(id).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException('Ayudaaa');
    });
    return `Itinerario has been deleted`;
  }
}
