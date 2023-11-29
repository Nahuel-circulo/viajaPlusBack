import { IsEmail, IsNumber, IsString, MinLength,Min} from "class-validator";

export class CreateUsuarioDto {


  @IsNumber()
  @Min(7000000)
  dni:number

  @IsString()
  @IsEmail()
  email:string


  @IsString()
  @MinLength(3)
  nombreCompleto:string


  @IsString()
  @MinLength(5)
  password:string




}
