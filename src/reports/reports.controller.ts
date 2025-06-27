import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  prueba() {
    return this.databaseService.select('select * from usuario;');
  }
}
