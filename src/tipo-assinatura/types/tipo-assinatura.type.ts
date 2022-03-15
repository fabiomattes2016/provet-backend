import { Decimal } from '@prisma/client/runtime';

export type TipoAssinaturaType = {
  descricao: string;
  valor: Decimal;
  tempoDeExpiracao: number;
};
