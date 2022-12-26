import type { RefObject, FC } from "react";
import Image from 'next/image';
import classNames from "classnames";
import type { PhotoWithUrl } from "../../types/Photo";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type GalleryImageProps = {
    photo: PhotoWithUrl
    position?: "left" | "center" | "right";
    gridSize: number;
    active: boolean;
    handleActive?: (id: string | undefined) => void;
}

const GalleryImage:FC<GalleryImageProps> = ({ photo, gridSize, active, handleActive=() => { /* */} }) => {

    const [ref] = useAutoAnimate();

    const executeScroll = () => ref.current?.scrollIntoView();

    const imgClasses = classNames(
        "relative aspect-square overflow-hidden",
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
                />
            </div>
            {active && gridSize === 1 &&
                <div className="px-3 pb-3 -mt-3 text-justify rounded-b-lg border-x-2 border-b-2 border-slate-800 bg-white">
                    <p>Lorem ipsum laborum.</p>
                </div>
            }
        </>
    )
}

export default GalleryImage;