import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClienteDto {
  @ApiProperty({
    description: 'A razão social do assinante',
    example: 'Empresa LTDA',
  })
  @IsNotEmpty({ message: 'Campo razão social não pode ser vazio' })
  razaoSocial: string;

  @ApiProperty({
    description: 'O CNPJ do assinante',
    example: '12.123.123/1234-12',
  })
  @IsNotEmpty({ message: 'Campo CNPJ não pode ser vazio' })
  cpnj: string;

  @ApiProperty({
    description: 'O telefone comercial do assinante',
    example: '(11) 1234-5678',
    required: false,
  })
  telefoneComercial: string;

  @ApiProperty({
    description: 'O telefone celular do assinante',
    example: '(11) 9123-1234',
  })
  @IsNotEmpty({ message: 'Campo celular não pode ser vazio' })
  celular: string;

  @ApiProperty({
    description: 'O endereço do assinante',
    example: 'Rua de Testes',
  })
  @IsNotEmpty({ message: 'Campo endereço não pode ser vazio' })
  endereco: string;

  @ApiProperty({
    description: 'O complemente do endereço do assinante',
    example: 'Casa B',
    required: false,
  })
  complemento: string;

  @ApiProperty({
    description: 'O bairro do assinante',
    example: 'Jardim de Testes',
  })
  @IsNotEmpty({ message: 'Campo bairro não pode ser vazio' })
  bairro: string;

  @ApiProperty({
    description: 'O número do endereço do assinante',
    example: '173A',
  })
  @IsNotEmpty({ message: 'Campo número não pode ser vazio' })
  numero: string;

  @ApiProperty({
    description: 'A cidade do assinante',
    example: 'São Paulo',
  })
  @IsNotEmpty({ message: 'Campo cidade não pode ser vazio' })
  cidade: string;

  @ApiProperty({
    description: 'O estado do assinante',
    example: 'SP',
  })
  @IsNotEmpty({ message: 'Campo estado não pode ser vazio' })
  estado: string;

  @ApiProperty({
    description: 'Responsável do estabelecimento assinante',
    example: 'Fulano de Almeida',
  })
  @IsNotEmpty({ message: 'Campo nome do responsável não pode ser vazio' })
  nomeResponsavel: string;

  @ApiProperty({
    description: 'O CPF do responsável do estabelecimento assinante',
    example: '123.123.123-12',
  })
  @IsNotEmpty({ message: 'Campo CPF do responsável não pode ser vazio' })
  cpfResponsavel: string;

  @ApiProperty({
    description: 'A data de vencimento da assinatura',
    example: '2022-04-25',
  })
  @IsNotEmpty({ message: 'Campo data de vencimento não pode ser vazio' })
  dataVencimento: string;

  @ApiProperty({
    description: 'O id da assinatura selecionada',
    example: '1',
  })
  @IsNotEmpty({ message: 'Campo tipo de assinatura não pode ser vazio' })
  @IsNumber({}, { message: 'Digite uma quantidade de dias validos' })
  tipoAssinaturaId: number;
}
