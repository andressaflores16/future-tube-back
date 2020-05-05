import { Request, Response } from "express";
import { UserDB } from "../../../data/userDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { LoginUserUC } from "../../../business/usecase/user/loginUser";
import { BcryptService } from "../../../services/bcryptService";

export const loginUserEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new LoginUserUC(
      new UserDB(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await uc.execute({
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.status || 400).send({
      errorMessage: err.message
    });
  }
};
