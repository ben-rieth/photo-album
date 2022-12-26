import { type FC, useState, type RefObject, useRef } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import GalleryImage from './GalleryImage';

import classNames from 'classnames';
import GridSizeSelector from './GridSizeSelector';
import TagMenu from './TagMenu';
import type { PhotoWithUrl } from '../../types/Photo';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import GalleryHeader from './GalleryHeader';
import useDontScrollOnCondition from '../../hooks/useDontScrollOnCondition';

type GalleryProps = {
    photos: PhotoWithUrl[];
    tags: string[];
    name: string;
}

const Gallery: FC<GalleryProps> = ({ photos, tags, name }) => {

    const [filteredImages, setFilteredImages] = useState<PhotoWithUrl[]>(photos);
    const [gridSize, setGridSize] = useState<number>(1);
    const [activeImage, setActiveImage] = useState<PhotoWithUrl | undefined>(undefined);

    const [animateRef] = useAutoAnimate();

    const ref = useRef<HTMLDivElement>();
    useDetectOutsideClick(ref as RefObject<HTMLDivElement>, () => setActiveImage(undefined));

    useDontScrollOnCondition(!!activeImage && gridSize !== 1);

    const filterItems = async (filter: string | undefined) => {
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
    }

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

            <TagMenu tags={tags} handleClick={filterItems}/>

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

            {activeImage && gridSize > 1 &&
                <>
                    <div className="bg-white p-5 w-80 fixed top-10 left-1/2 -translate-x-1/2 z-20">
                        <div 
                            ref={ref as RefObject<HTMLDivElement>}
                            className="w-full"
                        >
                            <GalleryImage 
                                photo={activeImage}
                                gridSize={gridSize}
                                active={false}
                            />
                        </div>
                        <p className="text-sm">Lorem ipsum</p>
                    </div>
                    <div className="fixed w-screen h-screen bg-black/80 z-10 top-0 left-0"/>
                </>
            }
        </main>
    )
};

export default Gallery;