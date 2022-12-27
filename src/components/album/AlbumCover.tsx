import type { Photo } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";
import GalleryImage from "../gallery/GalleryImage";

type AlbumCoverProps = {
    coverPhoto: Photo;
    name: string;
    albumId: string;
}

const AlbumCover:FC<AlbumCoverProps> = ({ coverPhoto, name, albumId }) => {
    
    return (
        <Link href={`/albums/${albumId}`}>
            <div className="group text-black bg-neutral-200  p-5 rounded-lg hover:scale-105 transform scale-100 transition-transform duration-250 ease-in-out">
                {coverPhoto ? (
                    <GalleryImage 
                        photo={coverPhoto}
                        gridSize={1}
                        active={false}
                    />
                    ) : ( null )
                }
                <h3 className="font-semibold font-handwriting text-center text-2xl 2xl:text-3xl my-1 group-hover:text-sky-500 text-black">
                    {name}
                </h3>
            </div>
        </Link>
    )
}

export default AlbumCover;