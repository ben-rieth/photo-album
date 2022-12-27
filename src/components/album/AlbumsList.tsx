import { useQuery } from '@tanstack/react-query';
import { env } from "../../env/client.mjs";
import axios from "axios";
import type { Album, Photo } from "@prisma/client";
import AlbumCover from './AlbumCover';

const AlbumsList = () => {
    
    const { data : albums, error } = useQuery<(Album & {featuredPhoto: Photo})[]>({
        queryKey: ["albums"],
        queryFn: async () => {
            const { data } = await axios.get(
                `${env.NEXT_PUBLIC_URL}/api/album`
            );

            return data;
        }
    });
    if (error) {
        return <p>Error</p>
    }

    if (!albums) {
        return <p>Loading...</p>
    }
    return (
        <div className="mx-10 my-5 gap-5 grid grid-cols-1 sm:grid-cols-2">
            {albums.map((album) => (
                <AlbumCover 
                    key={album.id}
                    coverPhoto={album.featuredPhoto}
                    name={album.name}
                    albumId={album.id}
                />
            ))}
        </div>
    )
};

export default AlbumsList;