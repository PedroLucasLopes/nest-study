import { Module } from '@nestjs/common';
import { AppController } from '../../Presentation/Controllers/app.controller';
import { AppService } from '../../Application/Service/app.service';
import { TasksModule } from './tasks.module';

/**
 * Module: É o modulo principal da aplicação, onde tudo é chamado, importado e exportado para conectar a outras partes da API
 * Service: Contém a lógica de negócio separado do Controller
 * Controller: Define as rotas e lida com as requisições
 */

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
