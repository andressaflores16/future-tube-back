import { VideoGateway } from "../../gateways/videoGateway";
import { v4 } from "uuid";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { Video } from "../../entities/video";

export class UploadVideoUC {
    constructor(
        private db: VideoGateway,
        private authenticationGateway: AuthenticationGateway
      ) {}

    public async execute(input: UploadVideoUCInput): Promise<UploadVideoUCOutput> {
        if (!input.token) {
            throw new Error("Missing authorization token, please log in to continue");
        }

        if (!input.url) {
            throw new Error("Please provide a video URL")
        }

        if (!input.title) {
            throw new Error("Please provide a video title")
        }

        const id = v4()
        const userIdFromToken = this.authenticationGateway.getUserInfoFromToken(input.token)
        const userId = userIdFromToken.userId

        const video = new Video(
            id,
            input.url,
            input.title,
            input.description,
            userId
        )

        await this.db.uploadVideo(video)

        return {
            message: "Video uploaded successfully"
        }

    }
}

interface UploadVideoUCInput {
    token: string;
    url: string;
    title: string;
    description: string;
}

interface UploadVideoUCOutput {
    message: string
}