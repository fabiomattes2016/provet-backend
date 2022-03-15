import { AtGuard } from './common/guards/at.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PerfilModule } from './perfil/perfil.module';
import { PrismaModule } from './prisma/prisma.module';
import { TipoAssinaturaModule } from './tipo-assinatura/tipo-assinatura.module';
import { ClienteModule } from './cliente/cliente.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PerfilModule,
    PrismaModule,
    TipoAssinaturaModule,
    ClienteModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
