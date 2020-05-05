import { VideoGateway } from "../../gateways/videoGateway";

export class GetVideoInfoByIdUC {
    constructor(
        private db: VideoGateway
    ) {}


    public async execute(input: GetVideoInfoByIdUCInput) {
        if (!input.videoId) {
            throw new Error("Please select video")
        }

        const video = await this.db.getVideoInfoById(input.videoId)

        if (!video) {
            throw new Error("Could not get video information")
        }

        return video
    }
}


interface GetVideoInfoByIdUCInput {
    videoId: string;
}
