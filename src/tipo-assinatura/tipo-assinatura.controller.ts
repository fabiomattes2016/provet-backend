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
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('Tipos de Assinatura')
@Controller('tipo-assinatura')
export class TipoAssinaturaController {
  constructor(private tipoAssinaturaService: TipoAssinaturaService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TipoAssinaturaDto,
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  index(): Promise<TipoAssinaturaType[]> {
    return this.tipoAssinaturaService.listar();
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: TipoAssinaturaDto,
  })
  @Post('/novo')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: TipoAssinaturaDto): Promise<TipoAssinaturaType> {
    return this.tipoAssinaturaService.novaAssinatura(dto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TipoAssinaturaDto,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<TipoAssinaturaType> {
    return this.tipoAssinaturaService.procurarAssinaturaPorId(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TipoAssinaturaDto,
  })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: TipoAssinaturaDto,
    @Param('id') id: string,
  ): Promise<TipoAssinaturaType> {
    return this.tipoAssinaturaService.atualizarAssinatura(id, dto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'No Content' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.tipoAssinaturaService.excluirAssinatura(id);
  }
}
