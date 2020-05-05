import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";


export class EditVideoInfoUC {
    constructor(
        private db: VideoGateway,
        private authenticationGateway: AuthenticationGateway
    ) {}

    public async execute(input: EditVideoInfoUCInput): Promise<EditVideoInfoUCOutput> {
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
        
        if (!input.videoId) {
            throw new Error("Please select video to edit")
        }

        await this.db.editVideoInfo(id, input.videoId, input.title, input.description)

        return {
            message: "Video information edited succesfully"
        }
    }
}

interface EditVideoInfoUCInput {
    token: string;
    videoId: string;
    title: string;
    description: string;
}

interface EditVideoInfoUCOutput {
    message: string;
}