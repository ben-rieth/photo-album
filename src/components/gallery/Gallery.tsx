import Image from 'next/image';
import type { FC } from 'react';

type GalleryProps = {
    urls:  string[];
}

const Gallery: FC<GalleryProps> = ({ urls }) => {

    return (
        <div className="grid grid-cols-2">
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