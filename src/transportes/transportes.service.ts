import {
  Injectable,
  Logger,
  InternalServerErrorException,
  Get
} from '@nestjs/common';
import { CreateTransporteDto } from './dto/create-transporte.dto';
import { UpdateTransporteDto } from './dto/update-transporte.dto';
import { Transporte } from './entities/transporte.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransportesService {
  private readonly logger = new Logger('TransportesService');
  constructor(
    @InjectRepository(Transporte)
    private readonly TransporteRepository: Repository<Transporte>
  ) {}
  async create(createTransporteDto: CreateTransporteDto) {
    try {
      const transporte = this.TransporteRepository.create(createTransporteDto);
      await this.TransporteRepository.save(transporte);
      return transporte;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Ayudaaa en Transporte');
    }
  }

  @Get()
  findAll() {
    return this.TransporteRepository.find();
  }

  findOne(id: number) {
    return this.TransporteRepository.findOne({
      where: { nro_transporte: id }
    });
  }

  update(id: number, updateTransporteDto: UpdateTransporteDto) {
    return `This action updates a #${id} transporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} transporte`;
  }
}
