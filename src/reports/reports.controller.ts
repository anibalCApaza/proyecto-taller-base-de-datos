import { Controller, Get, Render } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @Render('index')
  async prueba() {
    const data = await this.databaseService.select('select * from usuario;');

    return {
      data,
    };
  }
}
