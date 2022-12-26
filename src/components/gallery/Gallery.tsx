import { type FC, useState, type RefObject, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import GalleryImage from './GalleryImage';

import classNames from 'classnames';
import GridSizeSelector from './GridSizeSelector';
import type { PhotoWithUrl } from '../../types/Photo';
import GalleryHeader from './GalleryHeader';
import useDontScrollOnCondition from '../../hooks/useDontScrollOnCondition';
import ImageModal from './ImageModal';
import { useAtom } from 'jotai';
import { filterAtom, tagsAtom } from '../../store/filter';

type GalleryProps = {
    photos: PhotoWithUrl[];
    tags: string[];
    name: string;
}

const Gallery: FC<GalleryProps> = ({ photos, tags, name }) => {

    const [filteredImages, setFilteredImages] = useState<PhotoWithUrl[]>(photos);
    const [gridSize, setGridSize] = useState<number>(1);
    const [activeImage, setActiveImage] = useState<PhotoWithUrl | undefined>(undefined);

    const [filter, setFilter] = useAtom(filterAtom);
    const [, setTags] = useAtom(tagsAtom);

    // on initial load set the filter to undefined and the tags to the album tags
    useEffect(() => {
        setFilter(undefined);
        setTags(tags);
    }, [setFilter, setTags, tags]);

    // change displayed images when the tag filter is changed
    useEffect(() => {
        setFilteredImages([]);
        setTimeout(() => {
            if (filter) {
                setFilteredImages(
                    photos.filter((photo) => photo.tags.includes(filter))
                );
            } else {
                setFilteredImages(photos);
            }
        }, 250)
    }, [filter, photos]);

    const [animateRef] = useAutoAnimate();

    useDontScrollOnCondition(!!activeImage && gridSize !== 1);

    const handleActive = (id: string | undefined) => {
        if (!id) setActiveImage(undefined);
        setActiveImage(photos.find(photo => photo.id === id));
    }

    const galleryClasses = classNames(
        "relative grid gap-3 mx-5 my-3",
        {
            "grid-cols-1": gridSize === 1,
            "grid-cols-2": gridSize === 2,
            "grid-cols-3": gridSize === 3,
            "grid-cols-4": gridSize === 4,
        },
    );

    return (
        <main>
            <GalleryHeader title={name} />

            <GridSizeSelector 
                handleChange={(size: number) => {
                    setGridSize(size);
                    setActiveImage(undefined);
                } }
            />

            <div className={galleryClasses} ref={animateRef as RefObject<HTMLDivElement>}>
                {filteredImages.map((photo, index) => (
                    <GalleryImage 
                        photo={photo}
                        key={`gallery-${index}`}
                        gridSize={gridSize}
                        handleActive={handleActive}
                        active={activeImage?.id === photo.id}
                    />)
                )}
            </div>

            <ImageModal 
                photo={activeImage} 
                isOpen={!!activeImage && gridSize > 1}
                onClose={() => setActiveImage(undefined)}
            />
        </main>
    )
};

export default Gallery;