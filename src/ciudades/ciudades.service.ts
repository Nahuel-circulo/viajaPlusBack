import {
  Get,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { CreateCiudadeDto } from './dto/create-ciudade.dto';
import { UpdateCiudadeDto } from './dto/update-ciudade.dto';
import { Ciudad } from './entities/ciudad.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CiudadesService {
  private readonly logger = new Logger('CiudadesService');
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadesRepository: Repository<Ciudad>
  ) {}

  async create(createCiudadeDto: CreateCiudadeDto) {
    try {
      const ciudad = this.ciudadesRepository.create(createCiudadeDto);
      await this.ciudadesRepository.save(ciudad);
      return ciudad;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Ayudaaa en Ciudad');
    }
  }

  @Get()
  findAll() {
    return this.ciudadesRepository.find();
  }
  @Get()
  findOne(id: number) {
    return this.ciudadesRepository.find({
      where: {
        nro_Ciudad: id
      }
    });
  }

  update(id: number, updateCiudadeDto: UpdateCiudadeDto) {
    return `This action updates a #${id} ciudade`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciudade`;
  }
}
