import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CadastroDto {
  @ApiProperty({
    description: 'O nome do usuário no sistema',
    example: 'email@email.com',
  })
  @IsNotEmpty({ message: 'Campo nome não pode ser vazio' })
  nome: string;

  @ApiProperty({
    description: 'E-mail para login no sistema',
    example: 'email@email.com',
  })
  @IsNotEmpty({ message: 'Campo e-mail não pode ser vazio' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @ApiProperty({
    description: 'Senha para logar no sistema',
    example: 'senha-segura',
  })
  @IsNotEmpty({ message: 'Campo senha não pode ser vazio' })
  password: string;

  @ApiProperty({
    description: 'O id do assinante que está cadastrando o usuário',
    example: '1',
  })
  @IsNumber({}, { message: 'Digite um Id de Cliente válido' })
  @IsNotEmpty({ message: 'O Campo Ide Cliente é obrigatório' })
  clienteId: number;

  @ApiProperty({
    description: 'O id do perfil do usuário',
    example: 'email@email.com',
  })
  @IsNumber({}, { message: 'Digite um Id de Perfil válido' })
  @IsNotEmpty({ message: 'O Campo Ide Perfil é obrigatório' })
  perfilId: number;
}
