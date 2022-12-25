import type { FC } from "react";
import Image from 'next/image';

type GalleryImageProps = {
    url: string;
}

const GalleryImage:FC<GalleryImageProps> = ({ url }) => {
    return (
        <div 
            className="relative aspect-square overflow-hidden"
        >
            <Image 
                src={url}
                alt=""
                fill
                className="object-cover rounded-lg"
            />
        </div>
    )
}

export default GalleryImage;