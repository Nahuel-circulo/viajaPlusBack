import { Module } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Module({
  controllers: [CiudadesController],
  providers: [CiudadesService],
  imports: [TypeOrmModule.forFeature([Ciudad])]
})
export class CiudadesModule {}
