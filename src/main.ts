import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ProVet')
    .setDescription(
      'Sistema para gerenciamento de PetShops e Clinicas Veterinárias',
    )
    .setVersion('0.1b')
    .addTag('Autenticação')
    .addTag('Perfis de Usuários')
    .addTag('Tipos de Assinatura')
    .addTag('Clientes do Sistema')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
