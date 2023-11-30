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
import { Asiento } from './entities/asiento.entity';

@Injectable()
export class TransportesService {
  private readonly logger = new Logger('TransportesService');
  constructor(
    @InjectRepository(Transporte)
    private readonly TransporteRepository: Repository<Transporte>,
    @InjectRepository(Asiento)
    private readonly AsientoRepository: Repository<Asiento>,
  ) {}
  async create(createTransporteDto: CreateTransporteDto) {

    const {cant_Asiento} = createTransporteDto;

    try {
      const transporte = this.TransporteRepository.create(createTransporteDto);
      // crear los asientos y asignarlos al transporte
      transporte.asientos = [];
      for (let i = 1; i <= cant_Asiento; i++) {
        const asiento = this.AsientoRepository.create({ nro_asiento: i });
        transporte.asientos.push(asiento);
      }
      console.log(transporte);
      
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

  async update(id: number, updateTransporteDto: UpdateTransporteDto) {
    return await this.TransporteRepository.update(id, updateTransporteDto);
  }

  remove(id: number) {
    return `This action removes a #${id} transporte`;
  }
}
