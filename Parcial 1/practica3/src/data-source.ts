import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from './entities/usuario.model';

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Usuario],
  migrations: [],
  subscribers: [],
});
