import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'O e-mail cadastrado no sistema',
    example: 'email@email.com',
  })
  @IsNotEmpty({ message: 'Campo e-mail não pode ser vazio' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @ApiProperty({
    description: 'A senha cadastrada no sistema',
    example: 'senha-segura',
  })
  @IsNotEmpty({ message: 'Campo senha não pode ser vazio' })
  password: string;
}
