import { DataSource, type DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [__dirname + '/../../domain/entities/*.{ts,js}'],

  migrations: [__dirname + '/migrations/*.{ts,js}'],

  seeds: [__dirname + '/seeds/*.{ts,js}'],

  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
