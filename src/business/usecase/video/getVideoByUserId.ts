import { VideoGateway } from "../../gateways/videoGateway";
import { Video } from "../../entities/video";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class GetVideoByUserIdUC {
    constructor(
        private db: VideoGateway,
        private authenticationGateway: AuthenticationGateway 
    ) {}

    public async execute(input: GetVideoByUserIdUCInput): Promise<Video[]> {
        let id
        if (input.userId) {
            id = input.userId

        } else if (!input.userId && input.token) {
            const usersInfo = this.authenticationGateway.getUserInfoFromToken(
                input.token)

            id = usersInfo.userId
        } else {
            throw new Error("User not found")
        }

        const videos = await this.db.getVideoByUserId(id)
    
        if (!videos) {
            throw new Error("Could not get videos")
        }
        
        return videos
    }
}

interface GetVideoByUserIdUCInput {
    token?: string;
    userId?: string;
}
