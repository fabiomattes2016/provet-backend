import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TipoAssinaturaDto } from './dto';
import { TipoAssinaturaType } from './types';

@Injectable()
export class TipoAssinaturaService {
  constructor(private prismaService: PrismaService) {}

  async listar(): Promise<TipoAssinaturaType[]> {
    const assinaturas = await this.prismaService.tipoAssinatura.findMany();

    return assinaturas;
  }

  async novaAssinatura(dto: TipoAssinaturaDto): Promise<TipoAssinaturaType> {
    const nova = await this.prismaService.tipoAssinatura.create({
      data: dto,
    });

    return nova;
  }

  async procurarAssinaturaPorId(
    idAssinatura: string,
  ): Promise<TipoAssinaturaType> {
    const assinatura = await this.prismaService.tipoAssinatura.findUnique({
      where: {
        id: parseInt(idAssinatura),
      },
    });

    return assinatura;
  }

  async atualizarAssinatura(
    idAssinatura: string,
    dto: TipoAssinaturaDto,
  ): Promise<TipoAssinaturaType> {
    const assinatura = await this.prismaService.tipoAssinatura.update({
      where: {
        id: parseInt(idAssinatura),
      },
      data: dto,
    });

    return assinatura;
  }

  async excluirAssinatura(idAssinatura: string) {
    await this.prismaService.tipoAssinatura.delete({
      where: {
        id: parseInt(idAssinatura),
      },
    });
  }
}
