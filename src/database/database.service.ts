import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, createConnection, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;

  async onModuleInit() {
    try {
      this.connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'proyecto-taller-base-de-datos',
      });
      console.log('Conexión a base de datos realizada exitosamente');
    } catch (err) {
      console.error('Error al conectar con la base de datos:');
      console.log(err);
    }
  }

  async onModuleDestroy() {
    await this.connection.end();
    console.log('Conexión a base de datos cerrada');
  }

  async executeQuery(sql: string, params?: any[]): Promise<RowDataPacket[]> {
    const [rows] = await this.connection.execute<RowDataPacket[]>(sql, params);
    return rows;
  }
}
