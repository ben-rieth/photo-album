import { type FC, useState, type RefObject } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import GalleryImage from './GalleryImage';

import classNames from 'classnames';
import GridSizeSelector from './GridSizeSelector';

type Photo = {
    url: string;
    tags: string[];
    createdAt: string;
}

type GalleryProps = {
    photos: {
        url: string;
        tags: string[];
        createdAt: string;
    }[];
    tags: string[];
}

const Gallery: FC<GalleryProps> = ({ photos, tags }) => {

    const [filteredImages, setFilteredImages] = useState<Photo[]>(photos);
    const [gridSize, setGridSize] = useState<number>(1);

    const filterItems = async (filter: string) => {
        setFilteredImages([]);
        setTimeout(() => {
            setFilteredImages(photos.filter((photo) => photo.tags.includes(filter)));
        }, 250)
        
    }

    const [animateRef] = useAutoAnimate();

    const galleryClasses = classNames(
        "relative grid gap-3 mx-3 my-3",
        {
            "grid-cols-1": gridSize === 1,
            "grid-cols-2": gridSize === 2,
            "grid-cols-3": gridSize === 3,
            "grid-cols-4": gridSize === 4,
        }
    );

    return (
        <main>
            <ul>
                {tags.map((tag) => (
                    <li key={tag}>
                        <button 
                            onClick={() => filterItems(tag)}
                        >
                            {tag}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={() => setFilteredImages(photos)}>
                        None
                    </button>
                </li>
            </ul>

            <GridSizeSelector handleChange={(size: number) => setGridSize(size) }/>

            <div className={galleryClasses} ref={animateRef as RefObject<HTMLDivElement>}>
                {filteredImages.map((photo, index) => (
                    <GalleryImage 
                        url={photo.url} 
                        key={`gallery-${index}`}
                        gridSize={gridSize}
                    />)
                )}
            </div>
        </main>
    )
};

export default Gallery;