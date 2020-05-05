import { Request, Response } from "express";
import { GetAllVideosUC } from "../../../business/usecase/video/getAllVideos";
import { VideoDB } from "../../../data/videoDB";

export const GetAllVideosEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new GetAllVideosUC(
            new VideoDB()
        )

        const result = await uc.execute(Number(req.query.page))

        if (result === []) {
            throw new Error("No videos to show")
        }

        res.status(200).send({
            result
        })

    } catch (err) {
        res.status(err.status || 400).send({
            errorMessage: err.message
        })
    }
}