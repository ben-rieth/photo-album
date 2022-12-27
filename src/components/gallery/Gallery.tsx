import { type FC, useState, type RefObject, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import GalleryImage from './GalleryImage';

import classNames from 'classnames';
import GridSizeSelector from './GridSizeSelector';
import GalleryHeader from './GalleryHeader';
import useDontScrollOnCondition from '../../hooks/useDontScrollOnCondition';
import ImageModal from './ImageModal';
import { useAtom } from 'jotai';
import { filterAtom, gridAtom, tagsAtom } from '../../store/filter';
import TagMenu from './TagMenu';
import type { Photo } from '@prisma/client';
import useDimensions from '../../hooks/useDimensions';

type GalleryProps = {
    photos: Photo[];
    tags: string[];
    name: string;
}

const Gallery: FC<GalleryProps> = ({ photos, tags, name }) => {

    const [filteredImages, setFilteredImages] = useState<Photo[]>(photos);
    const [activeImage, setActiveImage] = useState<Photo | undefined>(undefined);

    const [filter, setFilter] = useAtom(filterAtom);
    const [, setTags] = useAtom(tagsAtom);
    const [gridSize, setGridSize] = useAtom(gridAtom);

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

    const { width } = useDimensions();

    useEffect(() => {

        let changeTo: number;
        if (width < 440) changeTo = 1;
        else if (width >= 440 && width < 768) changeTo = 2;
        else if (width >= 768 && width < 1024) changeTo = 3;
        else if (width >= 1024) changeTo = 4;

        setGridSize(prev => {
            if (
                prev === 1 && changeTo === 2 
                || prev == 2 && changeTo === 1
            ) {
                setActiveImage(undefined);
            }
                
            return changeTo;
        })


        
    }, [width, setGridSize])

    const [animateRef] = useAutoAnimate();

    useDontScrollOnCondition(!!activeImage && gridSize !== 1);

    const handleActive = (id: string | undefined) => {
        if (!id) setActiveImage(undefined);
        setActiveImage(photos.find(photo => photo.id === id));
    }

    const galleryClasses = classNames(
        "grid flex-1 mx-5",
        {
            "grid-cols-1 gap-5": gridSize === 1,
            "grid-cols-2 gap-5": gridSize === 2,
            "grid-cols-3 gap-3": gridSize === 3,
            "grid-cols-4 gap-3": gridSize === 4,
        },
    );

    const mainClasses = classNames(
        "relative"
    )

    return (
        <main className={mainClasses}>
            <GalleryHeader title={name} />
            <div className="md:flex relative">
                <aside className="basis-64 shrink-0 hidden md:block px-5 sticky top-5 h-fit">
                    <h2 className="text-3xl">Display Options</h2>
                    <TagMenu />
                    <GridSizeSelector />
                </aside>
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
            </div>
            <div className="h-10" />
            <ImageModal 
                photo={activeImage} 
                isOpen={!!activeImage && gridSize > 1}
                onClose={() => setActiveImage(undefined)}
            />
        </main>
    )
};

export default Gallery;