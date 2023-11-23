import {
  Get,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerario } from './entities/itinerario.entity';

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
  findAll() {
    return this.ItinerarioRepository.find();
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
