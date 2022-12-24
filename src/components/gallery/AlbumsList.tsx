import { useQuery } from '@tanstack/react-query';
import { env } from "../../env/client.mjs";
import axios from "axios";
import type { Album } from "@prisma/client";
import Link from 'next/link';

const AlbumsList = () => {
    
    const { data : albums, error } = useQuery<Album[]>({
        queryKey: ["albums"],
        queryFn: async () => {
            const { data } = await axios.get(
                `${env.NEXT_PUBLIC_URL}/api/album`
            );

            return data;
        }
    });
    console.log(error);
    if (error) {
        return <p>Error</p>
    }

    if (!albums) {
        return <p>Loading...</p>
    }
    return (
        <div>
            {albums.map((album) => (
                <Link
                    href={`/albums/${album.id}`}
                    key={album.id}
                >
                    <p>{album.name}</p>
                </Link>
                
            ))}
        </div>
    )
};

export default AlbumsList;