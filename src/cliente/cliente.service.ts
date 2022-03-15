import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteDto } from './dto';
import { ClienteType } from './types';

@Injectable()
export class ClienteService {
  constructor(private prismaService: PrismaService) {}

  async listar(): Promise<ClienteType[]> {
    const clientes = await this.prismaService.cliente.findMany({
      select: {
        id: true,
        razaoSocial: true,
        cpnj: true,
        telefoneComercial: true,
        celular: true,
        endereco: true,
        complemento: true,
        bairro: true,
        numero: true,
        cidade: true,
        estado: true,
        nomeResponsavel: true,
        cpfResponsavel: true,
        dataVencimento: true,
        tipoAssinaturaId: true,
        tipoAssinatura: {
          select: {
            id: true,
            descricao: true,
            valor: true,
            tempoDeExpiracao: true,
          },
        },
      },
    });

    return clientes;
  }

  async novoCliente(dto: ClienteDto): Promise<ClienteType> {
    const assinatura = await this.prismaService.tipoAssinatura.findUnique({
      where: {
        id: dto.tipoAssinaturaId,
      },
    });

    const data = new Date();
    data.setDate(data.getDate() + assinatura.tempoDeExpiracao);
    const novo = await this.prismaService.cliente.create({
      data: {
        razaoSocial: dto.razaoSocial,
        cpnj: dto.cpnj,
        telefoneComercial: dto.telefoneComercial,
        celular: dto.celular,
        endereco: dto.endereco,
        complemento: dto.complemento,
        bairro: dto.bairro,
        numero: dto.numero,
        cidade: dto.cidade,
        estado: dto.estado,
        nomeResponsavel: dto.nomeResponsavel,
        cpfResponsavel: dto.cpfResponsavel,
        dataVencimento: data,
        tipoAssinaturaId: dto.tipoAssinaturaId,
      },
    });

    return novo;
  }

  async procurarClientePorId(idCliente: string): Promise<ClienteType> {
    const cliente = await this.prismaService.cliente.findUnique({
      select: {
        id: true,
        razaoSocial: true,
        cpnj: true,
        telefoneComercial: true,
        celular: true,
        endereco: true,
        complemento: true,
        bairro: true,
        numero: true,
        cidade: true,
        estado: true,
        nomeResponsavel: true,
        cpfResponsavel: true,
        dataVencimento: true,
        tipoAssinaturaId: true,
        tipoAssinatura: {
          select: {
            id: true,
            descricao: true,
            valor: true,
            tempoDeExpiracao: true,
          },
        },
      },
      where: {
        id: parseInt(idCliente),
      },
    });

    return cliente;
  }

  async atualizarCliente(
    idCliente: string,
    dto: ClienteDto,
  ): Promise<ClienteType> {
    const assinatura = await this.prismaService.tipoAssinatura.findUnique({
      where: {
        id: dto.tipoAssinaturaId,
      },
    });

    const data = new Date();
    data.setDate(data.getDate() + assinatura.tempoDeExpiracao);

    const cliente = await this.prismaService.cliente.update({
      where: {
        id: parseInt(idCliente),
      },
      data: {
        razaoSocial: dto.razaoSocial,
        cpnj: dto.cpnj,
        telefoneComercial: dto.telefoneComercial,
        celular: dto.celular,
        endereco: dto.endereco,
        complemento: dto.complemento,
        bairro: dto.bairro,
        numero: dto.numero,
        cidade: dto.cidade,
        estado: dto.estado,
        nomeResponsavel: dto.nomeResponsavel,
        cpfResponsavel: dto.cpfResponsavel,
        dataVencimento: data,
        tipoAssinaturaId: dto.tipoAssinaturaId,
      },
    });

    return cliente;
  }

  async excluirCliente(idCliente: string) {
    await this.prismaService.cliente.delete({
      where: {
        id: parseInt(idCliente),
      },
    });
  }
}
