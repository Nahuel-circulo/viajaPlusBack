import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasajeService } from './pasaje.service';
import { CreatePasajeDto } from './dto/create-pasaje.dto';
import { UpdatePasajeDto } from './dto/update-pasaje.dto';

@Controller('pasaje')
export class PasajeController {
  constructor(private readonly pasajeService: PasajeService) {}

  @Post()
  create(@Body() createPasajeDto: CreatePasajeDto) {
    return this.pasajeService.create(createPasajeDto);
  }

  @Get()
  findAll() {
    return this.pasajeService.findAll();
  }

  @Get('/user/:dni')
  findAllByUser(@Param('dni') dni:string) {
    return this.pasajeService.findAllByUser(+dni);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasajeService.findOne(+id);
  }
  @Get('/itinerario/:id')
  findAsientosByItineraios(@Param('id') id: string) {
    return this.pasajeService.findAsientosByItinerarios(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasajeDto: UpdatePasajeDto) {
    return this.pasajeService.update(+id, updatePasajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasajeService.remove(+id);
  }
}
