import { Decimal } from '@prisma/client/runtime';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDecimal, IsNumber } from 'class-validator';

export class TipoAssinaturaDto {
  @ApiProperty({
    description: 'A descrição do Tipo da Assinatura',
    example: 'Plano Mensal',
  })
  @IsNotEmpty({ message: 'Campo descrição não pode ser vazio' })
  descricao: string;

  @ApiProperty({
    type: Number,
    description: 'O Valor do Tipo da Assinatura',
    example: '99.90',
  })
  @IsNotEmpty({ message: 'Campo valor não pode ser vazio' })
  @IsDecimal({}, { message: 'Digite um valor válido' })
  valor: Decimal;

  @ApiProperty({
    description: 'O tempo de expiração do Tipo da Assinatura em dias',
    example: '30',
  })
  @IsNotEmpty({ message: 'Campo tempo de expiração não pode ser vazio' })
  @IsNumber({}, { message: 'Digite uma quantidade de dias validos' })
  tempoDeExpiracao: number;
}
