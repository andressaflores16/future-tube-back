import { UserGateway } from "../business/gateways/userGateway";
import { User } from "../business/entities/user";
import { BaseDB } from "./baseDB";

export class UserDB extends BaseDB implements UserGateway  {

  private userTableName = "users_futuretube"

  public async createUser(user: User): Promise<void> {
    await this.connection.raw(`
    INSERT INTO ${this.userTableName} (id, name, email, password, birthDate, picture)
    VALUES(
      '${user.getId()}',
      '${user.getName()}',
      '${user.getEmail()}',
      '${user.getPassword()}',
      '${user.getBirthDate()}',
      '${user.getPicture()}'
    )
  `);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
      SELECT * FROM ${this.userTableName} WHERE email = '${email}'
    `);

    if (!result[0][0]) {
      return undefined;
    }

    return new User(
      result[0][0].id,
      result[0][0].name,
      result[0][0].email,
      result[0][0].password,
      result[0][0].birthDate,
      result[0][0].picture
    );
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
      SELECT * FROM ${this.userTableName} WHERE id = '${id}'
    `);

    if (!result[0][0]) {
      return undefined;
    }

    return new User(
      result[0][0].id,
      result[0][0].name,
      result[0][0].email,
      result[0][0].password,
      result[0][0].birthDate,
      result[0][0].picture
    );
  }

  public async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.connection.raw(`
      UPDATE ${this.userTableName}
      SET password = '${newPassword}'
      WHERE id = '${userId}'
    `);
  }
}
