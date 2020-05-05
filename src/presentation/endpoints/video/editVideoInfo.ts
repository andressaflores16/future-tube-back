import { Request, Response } from "express";
import { EditVideoInfoUC } from "../../../business/usecase/video/editVideoInfo";
import { VideoDB } from "../../../data/videoDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const EditVideoInfoEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new EditVideoInfoUC(
            new VideoDB(),
            new JwtAuthorizer()
        )

        const result = await uc.execute({
            token: req.headers.auth as string,
            videoId: req.params.videoId,
            title: req.body.title,
            description: req.body.description
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(err.status || 400).send({
            errMessage: err.message
        })
    }
}