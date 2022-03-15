import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Campo e-mail não pode ser vazio' })
  nome: string;

  @IsNotEmpty({ message: 'Campo e-mail não pode ser vazio' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'Campo senha não pode ser vazio' })
  password: string;

  @IsNumber({}, { message: 'Digite um Id de Cliente válido' })
  @IsNotEmpty({ message: 'O Campo Ide Cliente é obrigatório' })
  clienteId: number;

  @IsNumber({}, { message: 'Digite um Id de Perfil válido' })
  @IsNotEmpty({ message: 'O Campo Ide Perfil é obrigatório' })
  perfilId: number;
}
