import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItinerariosModule } from './itinerarios/itinerarios.module';
import { TransportesModule } from './transportes/transportes.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { CommonModule } from './common/common.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PasajeModule } from './pasaje/pasaje.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    ItinerariosModule,
    TransportesModule,
    CiudadesModule,
    CommonModule,
    UsuarioModule,
    PasajeModule
  ]
})
export class AppModule {}
