import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DeleteVideoUC {
    constructor(
        private db: VideoGateway,
        private authenticationGateway: AuthenticationGateway
    ) {}

    public async execute(input: DeleteVideoUCInput): Promise<DeleteVideoUCOutput> {
        if (!input.token) {
            throw new Error("Missing authorization token, please log in to continue");
        }
        const usersInfo = this.authenticationGateway.getUserInfoFromToken(
            input.token
          );
        const id = usersInfo.userId

        if(!id) {
            throw new Error("Please log in to continue")
        }

        if (!input.videoId || input.videoId.length !== 36) {
            throw new Error("Please select video to delete")
        }

        await this.db.deleteVideo(input.videoId)

        return {
            message: "Video deleted succesfully"
        }
    }
}

interface DeleteVideoUCInput {
    token: string;
    videoId: string;

}

interface DeleteVideoUCOutput {
    message: string;
}