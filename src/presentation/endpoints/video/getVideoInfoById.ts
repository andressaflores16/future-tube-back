import { Request, Response } from "express";
import { GetVideoInfoByIdUC } from "../../../business/usecase/video/getVideoInfoById";
import { VideoDB } from "../../../data/videoDB";

export const GetVideoInfoByIdEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new GetVideoInfoByIdUC(
            new VideoDB()
        )

        const result = await uc.execute({
            videoId: req.params.videoId
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(err.status || 400).send({
            errMessage: err.message
        })
    }
}