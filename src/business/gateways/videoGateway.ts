import { Video } from "../entities/video";

export interface VideoGateway {
    uploadVideo(video: Video): Promise<void>;
    getVideoByUserId(id: string): Promise<Video[] | undefined>
    editVideoInfo(userId: string, videoId: string, title: string, description: string): Promise<void>
    deleteVideo(videoId: string): Promise<void>
    getAllVideos(page: number): Promise<Video[] | undefined>
    getVideoInfoById(videoId: string): Promise<any>
}