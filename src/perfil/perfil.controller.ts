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
import { PerfilDto } from './dto';
import { PerfilService } from './perfil.service';
import { PerfilType } from './types';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('Perfis de Usuários')
@Controller('perfil')
export class PerfilController {
  constructor(private perfilService: PerfilService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PerfilDto,
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  index(): Promise<PerfilType[]> {
    return this.perfilService.listar();
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: PerfilDto,
  })
  @Post('/novo')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: PerfilDto): Promise<PerfilType> {
    return this.perfilService.novoPerfil(dto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PerfilDto,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<PerfilType> {
    return this.perfilService.procurarPerfilPorId(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PerfilDto,
  })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: PerfilDto, @Param('id') id: string): Promise<PerfilType> {
    return this.perfilService.atualizarPerfil(id, dto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'No Content' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.perfilService.excluirPerfil(id);
  }
}
