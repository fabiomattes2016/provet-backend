import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PerfilDto } from './dto';
import { PerfilType } from './types';

@Injectable()
export class PerfilService {
  constructor(private prisma: PrismaService) {}

  async listar(): Promise<PerfilType[]> {
    const perfis = this.prisma.perfil.findMany();

    return perfis;
  }

  async novoPerfil(dto: PerfilDto): Promise<PerfilType> {
    const novo = await this.prisma.perfil.create({
      data: {
        descricao: dto.descricao,
      },
    });

    return novo;
  }

  async procurarPerfilPorId(idPerfil: string): Promise<PerfilType> {
    const perfilEncontrado = await this.prisma.perfil.findUnique({
      where: {
        id: parseInt(idPerfil),
      },
    });

    return perfilEncontrado;
  }

  async atualizarPerfil(idPerfil: string, dto: PerfilDto): Promise<PerfilType> {
    const perfil = await this.prisma.perfil.update({
      where: {
        id: parseInt(idPerfil),
      },
      data: {
        descricao: dto.descricao,
      },
    });

    return perfil;
  }

  async excluirPerfil(idPerfil: string) {
    await this.prisma.perfil.delete({
      where: {
        id: parseInt(idPerfil),
      },
    });
  }
}
