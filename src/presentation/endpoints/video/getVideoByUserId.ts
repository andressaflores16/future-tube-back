import { Request, Response } from "express";
import { GetVideoByUserIdUC } from "../../../business/usecase/video/getVideoByUserId";
import { VideoDB } from "../../../data/videoDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const GetVideoByUserIdEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new GetVideoByUserIdUC(
            new VideoDB(),
            new JwtAuthorizer()
        )

        const result = await uc.execute({
            token: req.headers.auth as string,
            userId: req.query.userId
        })

        res.status(200).send({
            result
        })
    } catch (err) {
        res.status(err.status || 400).send({
            errorMessage: err.message
        })
    }
}