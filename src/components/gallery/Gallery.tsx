import Image from 'next/image';
import type { FC } from 'react';

type GalleryProps = {
    urls: string[];
}

const Gallery: FC<GalleryProps> = ({ urls }) => {
    return (
        <div>
            {urls && urls.map((url, index) => {
                return (
                    <div 
                        key={`gallery-${index}`}
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
            })}
        </div>
    )
};

export default Gallery;