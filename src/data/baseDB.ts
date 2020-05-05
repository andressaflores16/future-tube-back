import knex from "knex";

export abstract class BaseDB {
  protected connection = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    }
  });
}
