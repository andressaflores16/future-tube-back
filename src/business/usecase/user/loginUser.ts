import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class LoginUserUC {
  constructor(
    private db: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  public async execute(input: LoginUserUCInput): Promise<LoginUserUCOutput> {
    const user = await this.db.getUserByEmail(input.email);

    if (!user) {
      throw new Error("User not found");
    }


    if (!await this.cryptographyGateway.compare(input.password, user.getPassword())) {
      throw new Error("Wrong email or password");
    }

    const token = this.authenticationGateway.generateToken({
      userId: user.getId()
    });

    return {
      message: "User logged in succesfully",
      token,
      name: user.getName(),
      email: user.getEmail(),
      picture: user.getPicture()
    };
  }
}

interface LoginUserUCInput {
  email: string;
  password: string;
}

interface LoginUserUCOutput {
  message: string;
  token: string;
  name: string;
  email: string;
  picture: string;
}
