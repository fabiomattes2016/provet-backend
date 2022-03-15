import { Decimal } from '@prisma/client/runtime';

export class TipoAssinaturaDto {
  descricao: string;
  valor: Decimal;
  tempoDeExpiracao: number;
}
