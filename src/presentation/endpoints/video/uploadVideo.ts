import { Request, Response } from "express";
import { UploadVideoUC } from "../../../business/usecase/video/uploadVideo"
import { VideoDB } from "../../../data/videoDB"
import { JwtAuthorizer } from "../../../services/jwtAuthorizer"

export const uploadVideoEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new UploadVideoUC(
            new VideoDB(),
            new JwtAuthorizer()
        )

        const result = await uc.execute({
            token: req.headers.auth as string,
            url: req.body.url,
            title: req.body.title,
            description: req.body.description
        })

        res.status(200).send(result)
    } catch (err){
        res.status(err.status || 400).send({
            errorMessage: err.message
        })
    }
}