import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userLoginDTO } from 'src/common/dto/userLogin.tdo';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuarioRepository.create(createUsuarioDto);
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  async login(userLoginDTO: userLoginDTO) {

    const { email, password } = userLoginDTO;

    console.log(email);
    const usuario = await this.usuarioRepository.findOne({
      where:
      {
        email: userLoginDTO.email,
        password: userLoginDTO.password,
      },

    })

    if (!usuario)
      throw new NotFoundException("Usuario no encontrado")

    return {
      email: usuario.email,
      dni: usuario.dni,
      nombre: usuario.nombreCompleto,
    }

  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({
      where:
      {
        dni: id
      }
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
