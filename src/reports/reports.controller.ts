import { Body, Controller, Get, Post, Render } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @Render('index')
  async getIndex() {
    const res = await this.databaseService.executeQuery('show tables;');
    const tables = res.map((row) => Object.values(row)[0]);
    const jsonData = JSON.stringify(tables);
    return {
      tables,
    };
  }

  @Post()
  @Render('index')
  async postIndex(@Body('nameTable') nameTable: string) {
    const res = await this.databaseService.executeQuery('show tables;');
    const tables = res.map((row) => Object.values(row)[0]);

    const fields = await this.databaseService.executeQuery(
      `describe ${nameTable};`,
    );

    const data = await this.databaseService.executeQuery(
      `SELECT * FROM ${nameTable};`,
    );

    return {
      tables,
      nameTable,
      data,
      fields,
    };
  }

  @Get('reporte3')
  @Render('reporte3')
  async reporte3() {
    const branch = await this.databaseService.executeQuery(
      'SELECT s.direccion from sucursal s;',
    );
    console.log(branch);
    return {
      branch,
    };
  }

  @Get('reporte4')
  @Render('reporte4')
  async getReporte4() {
    return {};
  }

  @Post('reporte4')
  @Render('reporte4')
  async postReporte4(
    @Body('fecha_ini') fechaIni: string,
    @Body('fecha_fin') fechaFin: string,
  ) {
    const [data] = await this.databaseService.executeQuery(
      `call procedimiento4('${fechaIni}', '${fechaFin}');`,
    );

    console.log(`${fechaIni}  ${fechaFin}`);
    console.log(data);

    return { data };
  }

  @Get('reporte5')
  @Render('reporte5')
  async getReporte5() {
    return {};
  }

  @Post('reporte5')
  @Render('reporte5')
  async postReporte5(@Body('placa') placa: String) {
    const [data] = await this.databaseService.executeQuery(
      `call procedimiento5('${placa}')`,
    );
    console.log(data);

    return {
      data,
    };
  }

  @Get('ejercicio')
  @Render('index')
  async ejercicio1(@Body('id') id) {
    console.log(id);

    const data = await this.databaseService.executeQuery('call ejemplo();');
    const jsonData = JSON.stringify(data);
    return {
      data,
      jsonData,
    };
  }
}
