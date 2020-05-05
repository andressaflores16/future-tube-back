import { Request, Response } from "express";
import { CreateUserUC } from "../../../business/usecase/user/createUser";
import { UserDB } from "../../../data/userDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";

export const createUserEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new CreateUserUC(
      new UserDB(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await uc.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      picture: req.body.picture
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.status || 400).send({
      errMessage: err.message
    });
  }
};
