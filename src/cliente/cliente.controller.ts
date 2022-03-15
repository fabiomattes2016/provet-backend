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
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators';

@ApiTags('Clientes do Sistema')
@Controller('cliente')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ClienteDto,
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  index(): Promise<ClienteType[]> {
    return this.clienteService.listar();
  }

  @Public()
  @ApiCreatedResponse({
    type: ClienteDto,
  })
  @Post('/novo')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: ClienteDto): Promise<ClienteType> {
    return this.clienteService.novoCliente(dto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ClienteDto,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<ClienteType> {
    return this.clienteService.procurarClientePorId(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOkResponse({
    type: ClienteDto,
  })
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: ClienteDto,
    @Param('id') id: string,
  ): Promise<ClienteType> {
    return this.clienteService.atualizarCliente(id, dto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'No Content' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.clienteService.excluirCliente(id);
  }
}
