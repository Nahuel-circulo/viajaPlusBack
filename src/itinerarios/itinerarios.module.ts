import { Module } from '@nestjs/common';
import { ItinerariosService } from './itinerarios.service';
import { ItinerariosController } from './itinerarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerario } from './entities/itinerario.entity';
import { ItinerarioCiudad } from './entities/itinerarioCiudad.entity';

@Module({
  controllers: [ItinerariosController],
  providers: [ItinerariosService],
  imports: [TypeOrmModule.forFeature([Itinerario, ItinerarioCiudad])]
})
export class ItinerariosModule {}
