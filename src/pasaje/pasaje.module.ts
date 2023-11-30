import { Module } from '@nestjs/common';
import { PasajeService } from './pasaje.service';
import { PasajeController } from './pasaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pasaje } from './entities/pasaje.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ItinerariosModule } from 'src/itinerarios/itinerarios.module';
import { TransportesModule } from 'src/transportes/transportes.module';
import { CiudadesModule } from 'src/ciudades/ciudades.module';

@Module({
  controllers: [PasajeController],
  providers: [PasajeService],
  imports: [TypeOrmModule.forFeature([Pasaje]),
    UsuarioModule, ItinerariosModule, TransportesModule,CiudadesModule]
})
export class PasajeModule { }
