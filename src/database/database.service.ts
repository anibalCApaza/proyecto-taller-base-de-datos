import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import mysql, { Query, RowDataPacket } from 'mysql2';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    try {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'proyecto-taller-base-de-datos',
      });
      console.log('Conexión a base de datos realizada exitosamente');
    } catch (err) {
      console.error('Error al conectar con la base de datos: ');
    }
  }

  async onModuleDestroy() {
    await this.connection.end();
    console.log('Conexión a base de datos cerrada');
  }

  async select(sql: string, params?: any[]): Promise<Query> {
    const rows = this.connection.execute<RowDataPacket[]>(sql, params);
    return rows;
  }
}
