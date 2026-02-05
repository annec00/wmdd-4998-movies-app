export type Media = {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    popularity: number;
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "tv";
};

export const getMediaTitle = (media: Media): string => {
    return media.media_type === "movie" ? media.title! : media.name!;
};

export const getMediaReleaseDate = (media: Media): string => {
    return media.media_type === "movie" ? media.release_date! : media.first_air_date!;
};
