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
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto';
import { ClienteType } from './types';

@Controller('cliente')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  index(): Promise<ClienteType[]> {
    return this.clienteService.listar();
  }

  @Post('/novo')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: ClienteDto): Promise<ClienteType> {
    return this.clienteService.novoCliente(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<ClienteType> {
    return this.clienteService.procurarClientePorId(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: ClienteDto,
    @Param('id') id: string,
  ): Promise<ClienteType> {
    return this.clienteService.atualizarCliente(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.clienteService.excluirCliente(id);
  }
}
