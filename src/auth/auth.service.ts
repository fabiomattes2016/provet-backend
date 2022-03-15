import { Tokens } from './types/tokens.type';
import { ResponseCadastro } from './types/cadastro.type';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CadastroDto } from './dto/cadastro.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: CadastroDto): Promise<ResponseCadastro> {
    const hash = await this.hashData(dto.password);

    await this.prisma.usuario.create({
      data: {
        nome: dto.email,
        email: dto.email,
        hash,
        perfilId: dto.perfilId,
        clienteId: dto.clienteId,
      },
    });

    const response = {
      message: 'Cadastro efetuado com sucesso!',
    };

    return response;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!usuario) throw new ForbiddenException('Acesso negado');

    const passwordMatches = await bcrypt.compare(dto.password, usuario.hash);
    if (!passwordMatches) throw new ForbiddenException('Accesso negado');

    const tokens = await this.getTokens(usuario.id, usuario.email);
    await this.updateRtHash(usuario.id, tokens.refresh_token);

    return tokens;
  }

  async logout(usuarioId: number) {
    await this.prisma.usuario.updateMany({
      where: {
        id: usuarioId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }

  async refreshTokens(usuarioId: number, rt: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!usuario || !usuario.hashRt)
      throw new ForbiddenException('Acesso negado');

    const rtMatches = await bcrypt.compare(rt, usuario.hashRt);
    if (!rtMatches) throw new ForbiddenException('Acesso negado');

    const tokens = await this.getTokens(usuario.id, usuario.email);
    await this.updateRtHash(usuario.id, tokens.refresh_token);

    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(usuarioId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: usuarioId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: usuarioId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(usuarioId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.usuario.update({
      where: {
        id: usuarioId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
