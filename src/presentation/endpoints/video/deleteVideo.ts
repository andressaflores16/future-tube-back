import { Request, Response } from "express";
import { DeleteVideoUC } from "../../../business/usecase/video/deleteVideo";
import { VideoDB } from "../../../data/videoDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const DeleteVideoEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new DeleteVideoUC(
            new VideoDB(),
            new JwtAuthorizer()
        )

        const result = await uc.execute({
            token: req.headers.Authorization as string,
            videoId: req.params.videoId
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(err.status || 400).send({
            errMessage: err.message
        })
    }
}