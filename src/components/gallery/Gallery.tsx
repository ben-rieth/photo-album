import { type FC, useState, type RefObject } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import GalleryImage from './GalleryImage';

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

    // const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
    const [filteredImages, setFilteredImages] = useState<Photo[]>(photos);

    const filterItems = async (filter: string) => {
        setFilteredImages([]);
        setTimeout(() => {
            setFilteredImages(photos.filter((photo) => photo.tags.includes(filter)));
        }, 250)
        
    }

    // const [images, setImages] = useState<any[]>();

    // const images = photos.map((photo, index) => 
    //     <GalleryImage url={photo.url} key={`gallery-${index}`}/>);

    const [animateRef] = useAutoAnimate();

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

            <div className="grid grid-cols-2 gap-3 mx-3 my-3" ref={animateRef as RefObject<HTMLDivElement>}>
                {filteredImages.map((photo, index) => (
                    <GalleryImage url={photo.url} key={`gallery-${index}`}/>)
                )}
            </div>
        </main>
    )
};

export default Gallery;