import { VideoGateway } from "../../gateways/videoGateway";
import { Video } from "../../entities/video";

export class GetAllVideosUC {
    constructor(
        private db: VideoGateway
    ) {}

    public async execute(page: number): Promise<Video[]> {

        const videos = await this.db.getAllVideos(page)
        
        if (!videos || videos === []) {
            throw new Error("Could not get videos")
        }
        
        return videos
    }
}