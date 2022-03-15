import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PerfilDto {
  @ApiProperty({
    description: 'A descrição do perfil',
    example: 'ADMINISTRAÇÃO',
  })
  @IsNotEmpty({ message: 'Campo descrição não pode ser vazio' })
  descricao: string;
}
