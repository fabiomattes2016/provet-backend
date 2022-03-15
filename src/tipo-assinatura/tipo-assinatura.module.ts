import { Module } from '@nestjs/common';
import { TipoAssinaturaService } from './tipo-assinatura.service';
import { TipoAssinaturaController } from './tipo-assinatura.controller';

@Module({
  providers: [TipoAssinaturaService],
  controllers: [TipoAssinaturaController],
})
export class TipoAssinaturaModule {}
