import { Module } from '@nestjs/common';
import { TransportesService } from './transportes.service';
import { TransportesController } from './transportes.controller';
import { Transporte } from './entities/transporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asiento } from './entities/asiento.entity';

@Module({
  controllers: [TransportesController],
  providers: [TransportesService],
  imports: [TypeOrmModule.forFeature([Transporte,Asiento])],
  exports: [TransportesService, TypeOrmModule]
})
export class TransportesModule {}
