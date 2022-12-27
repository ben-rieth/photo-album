import type { Photo } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { env } from "../../env/client.mjs";
import type { PhotoWithUrl } from "../../types/Photo";
import GalleryImage from "../gallery/GalleryImage";

type AlbumCoverProps = {
    coverPhoto: Photo | null;
    name: string;
    albumId: string;
}

const AlbumCover:FC<AlbumCoverProps> = ({ coverPhoto, name, albumId }) => {
    
    const [photo, setPhoto] = useState<PhotoWithUrl | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (coverPhoto) {
                
                try {
                    const data = await axios.post(
                        `${env.NEXT_PUBLIC_URL}/api/photo/generateUrl`,
                        {
                            filename: coverPhoto?.filename,
                            albumId
                        }
                    ).then((res) => res.data);

                    setPhoto({
                        id: coverPhoto.id,
                        createdAt: coverPhoto.createdAt as unknown as string,
                        updatedAt: coverPhoto.updatedAt as unknown as string,
                        tags: coverPhoto.tags,
                        url: data.url,
                        placeholder: data.placeholder
                    });

                } catch(err) {
                    console.log(err);
                    setPhoto(undefined);
                }
            }
        })();
    }, [coverPhoto, albumId])
    
    return (
        <Link href={`/albums/${albumId}`}>
            <div className="group text-black bg-neutral-200  p-5 rounded-lg hover:scale-105 transform scale-100 transition-transform duration-250 ease-in-out">
                {photo ? (
                    <GalleryImage 
                        photo={photo}
                        gridSize={1}
                        active={false}
                    />
                    ) : ( null )
                }
                <h3 className="font-semibold text-center text-2xl 2xl:text-3xl my-1 group-hover:text-sky-500 text-black">
                    {name}
                </h3>
            </div>
        </Link>
    )
}

export default AlbumCover;