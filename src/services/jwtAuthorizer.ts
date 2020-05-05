import {
  AuthenticationGateway,
  UserInfoToken
} from "../business/gateways/authenticationGateway";
import * as jwt from "jsonwebtoken";

export class JwtAuthorizer implements AuthenticationGateway {
  private SECRET_KEY = process.env.MY_SECRET_KEY as string;
  private expiresIn = "10h";

  public generateToken(input: UserInfoToken): string {
    const token = jwt.sign(
      {
        userId: input.userId
      },
      this.SECRET_KEY,
      {
        expiresIn: this.expiresIn
      }
    );

    return token;
  }

  public getUserInfoFromToken(token: string): UserInfoToken {
    const result = jwt.verify(token, this.SECRET_KEY) as UserInfoToken; 
    return {
      userId: result.userId
    };
  }
}
