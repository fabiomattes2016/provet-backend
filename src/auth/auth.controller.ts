import { RtGuard } from './../common/guards/rt.guard';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Tokens } from './types/tokens.type';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { ResponseCadastro } from './types/cadastro.type';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CadastroDto } from './dto/cadastro.dto';
import { TokensDto } from './dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiCreatedResponse({ type: CadastroDto })
  @Post('/novo')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: CadastroDto): Promise<ResponseCadastro> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @ApiOkResponse({
    type: TokensDto,
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'No Content' })
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @ApiOkResponse({
    type: TokensDto,
  })
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
