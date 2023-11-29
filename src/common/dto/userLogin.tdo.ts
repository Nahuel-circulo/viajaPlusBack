import { IsEmail, MinLength } from 'class-validator';


export class userLoginDTO {

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}



