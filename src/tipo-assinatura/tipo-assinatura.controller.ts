import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TipoAssinaturaDto } from './dto';
import { TipoAssinaturaService } from './tipo-assinatura.service';
import { TipoAssinaturaType } from './types';

@Controller('tipo-assinatura')
export class TipoAssinaturaController {
  constructor(private tipoAssinaturaService: TipoAssinaturaService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  index(): Promise<TipoAssinaturaType[]> {
    return this.tipoAssinaturaService.listar();
  }

  @Post('/novo')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: TipoAssinaturaDto): Promise<TipoAssinaturaType> {
    return this.tipoAssinaturaService.novaAssinatura(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<TipoAssinaturaType> {
    return this.tipoAssinaturaService.procurarAssinaturaPorId(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: TipoAssinaturaDto,
    @Param('id') id: string,
  ): Promise<TipoAssinaturaType> {
    return this.tipoAssinaturaService.atualizarAssinatura(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.tipoAssinaturaService.excluirAssinatura(id);
  }
}
