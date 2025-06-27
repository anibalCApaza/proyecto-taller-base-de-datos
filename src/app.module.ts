import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { ReportsController } from './reports/reports.controller';

@Module({
  imports: [],
  providers: [DatabaseService],
  controllers: [ReportsController],
})
export class AppModule {}
