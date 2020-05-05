import { BaseDB } from "./baseDB";
import { VideoGateway } from "../business/gateways/videoGateway";
import { Video } from "../business/entities/video";


export class VideoDB extends BaseDB implements VideoGateway {
    private videoTableName = "videos_futuretube"
    private userTableName = "users_futuretube"

    public async uploadVideo(video: Video): Promise<void> {
        await this.connection.raw(`
        INSERT INTO ${this.videoTableName} (id, url, title, description, userId)
        VALUES(
            '${video.getId()}',
            '${video.getURL()}',
            '${video.getTitle()}',
            '${video.getDescription()}',
            '${video.getUserId()}'
        )`);
    }

    public async getVideoByUserId(userId: string): Promise<Video[] | undefined> {
        const result = await this.connection.raw(`
            SELECT * FROM ${this.videoTableName} WHERE userId = '${userId}'
        `)

        if (!result[0]) {
            return undefined
        }

        return result[0].map((video: any) => {
            return new Video(
                video.id,
                video.url,
                video.title,
                video.description,
                video.userId
            )
        })
    }

    public async editVideoInfo(userId: string, videoId: string, title: string, description: string): Promise<void> {
        await this.connection.from(this.videoTableName)
            .where({
                userId: `${userId}`,
                id: `${videoId}`
            })
            .update({
                title,
                description
            })
    }

    public async deleteVideo(videoId: string): Promise<void> {
        await this.connection.raw(`
            DELETE FROM ${this.videoTableName} WHERE id = '${videoId}'
        `)
    }

    public async getAllVideos(page: number = 0): Promise<Video[] | undefined> {
        try {
            const offset = (page - 1) * 10

            const result = await this.connection.raw(`
                SELECT id, title, url FROM ${this.videoTableName}
                LIMIT 10
                OFFSET ${offset}
            `)

            if (!result[0] || result[0] === []) {
                return undefined
            }

            return result[0]

        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    public async getVideoInfoById(videoId: string): Promise<any> {
        const result = await this.connection.raw(`
            SELECT ${this.videoTableName}.*, ${this.userTableName}.name, ${this.userTableName}.picture
            FROM ${this.videoTableName} JOIN ${this.userTableName} ON userId = ${this.userTableName}.id
            WHERE ${this.videoTableName}.id = '${videoId}'
        `)

        if (!result[0][0]) {
            return undefined
        }

        return {
            id: result[0][0].id,
            userId: result[0][0].userId,
            url: result[0][0].url,
            description: result[0][0].description,
            title: result[0][0].title,
            name: result[0][0].name,
            picture: result[0][0].picture
        }
    }
}