import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserGateway } from "../../gateways/userGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class ChangePasswordUC {
  constructor(
    private db: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  public async execute(
    input: ChangePasswordUCInput
  ): Promise<ChangePasswordUCOutput> {
    if (!input.token) {
      throw new Error("Missing authorization token, please log in to continue");
    }

    const usersInfo = this.authenticationGateway.getUserInfoFromToken(
      input.token
    );
    const id = usersInfo.userId;

    const user = await this.db.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.getEmail() !== input.email) {
      throw new Error("Incorrect information");
    }

    const isPasswordCorrect = await this.cryptographyGateway.compare(
      input.oldPassword,
      user.getPassword()
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorrect information");
    }

    const pass = await this.cryptographyGateway.encrypt(input.newPassword);
    await this.db.updatePassword(user.getId(), pass);

    const token = this.authenticationGateway.generateToken({
      userId: user.getId()
    });

    return {
      token
    };
  }
}

interface ChangePasswordUCInput {
  token: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordUCOutput {
  token: string;
}
