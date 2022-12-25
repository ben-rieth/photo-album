import { type FC, useState, useRef, type RefObject } from "react";
import Image from 'next/image';
import classNames from "classnames";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type GalleryImageProps = {
    url: string;
    position?: "left" | "center" | "right";
    gridSize: number;
}

const GalleryImage:FC<GalleryImageProps> = ({ url, gridSize }) => {

    const [active, setActive] = useState<boolean>(false);
    // const ref = useRef<HTMLDivElement>();

    const [ref] = useAutoAnimate();
    useDetectOutsideClick(ref as RefObject<HTMLDivElement>, () => setActive(false));

    const imgClasses = classNames(
        "relative aspect-square overflow-hidden",
    );

    // const containerClasses = classNames(
    //     "transition-transform duration-400 z-10",
    //     {
    //         "translate-x-0 scale-100": !active,
    //         "origin-top-left": position === 'left',
    //         "translate-x-1/4": active && position === 'left',
    //         "origin-top-right": position === 'right',
    //         "-translate-x-1/4 -translate-y-1/4": active && position === 'right',
    //         "scale-150 z-50": active,
    //         "origin-top-center": position === 'center',
    //     }
    // );

    const containerClasses = classNames()


    return (
        <div 
            ref={ref as RefObject<HTMLDivElement>} 
            className={containerClasses}
        >
            <div 
                className={imgClasses}
                onClick={() => setActive(prev => !prev)}
                //ref={ref as RefObject<HTMLDivElement>}
            >
                <Image 
                    src={url}
                    alt=""
                    fill
                    className="object-cover rounded-t-lg"
                />
            </div>
            {active && gridSize === 1 &&
                <div className="p-3 text-justify rounded-b-lg border-x-2 border-b-2 border-slate-800 bg-white">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            }
        </div>
    )
}

export default GalleryImage;