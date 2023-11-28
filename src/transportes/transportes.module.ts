import { Module } from '@nestjs/common';
import { TransportesService } from './transportes.service';
import { TransportesController } from './transportes.controller';
import { Transporte } from './entities/transporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TransportesController],
  providers: [TransportesService],
  imports: [TypeOrmModule.forFeature([Transporte])],
  exports: [TransportesService, TypeOrmModule]
})
export class TransportesModule {}
