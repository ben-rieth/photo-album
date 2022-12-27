import type { RefObject, FC } from "react";
import Image from 'next/image';
import classNames from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Photo } from "@prisma/client";

type GalleryImageProps = {
    photo: Photo
    gridSize: number;
    active: boolean;
    handleActive?: (id: string | undefined) => void;
}

const GalleryImage:FC<GalleryImageProps> = ({ photo, gridSize, active, handleActive=() => { /* */} }) => {

    const [ref] = useAutoAnimate();

    const executeScroll = () => ref.current?.scrollIntoView();

    const imgClasses = classNames(
        "aspect-square overflow-hidden",
        {
            "rounded-lg": !active || gridSize > 1,
            "rounded-t-lg": active,
        }
    );

    const handleClick = () => {
        if (!active) {
            if (gridSize === 1) executeScroll();
            handleActive(photo.id);
        }
        else handleActive(undefined);
    }


    return (
        <>
            <div 
                className={imgClasses}
                onClick={handleClick}
                ref={ref as RefObject<HTMLDivElement>}
            >
                <Image 
                    src={photo.url}
                    alt=""
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={photo.placeholder}
                />
            </div>
            {active && gridSize === 1 &&
                <div className="px-3 pb-3 -mt-5 text-justify rounded-b-lg border-x-2 border-b-2 border-slate-800 bg-white">
                    <p>Lorem ipsum laborum.</p>
                </div>
            }
        </>
    )
}

export default GalleryImage;