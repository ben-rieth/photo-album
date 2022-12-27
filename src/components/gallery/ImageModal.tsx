import type { Photo } from "@prisma/client";
import { type FC, type RefObject, useRef } from "react";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";
import GalleryImage from "./GalleryImage";

type ImageModalProps = {
    photo: Photo | undefined;
    isOpen: boolean;
    onClose: () => void;
}

const ImageModal:FC<ImageModalProps> = ({ photo, isOpen, onClose }) => {
    
    const ref = useRef<HTMLDivElement>();
    useDetectOutsideClick(ref as RefObject<HTMLDivElement>, onClose); 
    
    if (!isOpen || !photo) return null;

    return (
        <>
            <div className="bg-white p-5 w-80 fixed top-10 left-1/2 -translate-x-1/2 z-20">
                <div 
                    ref={ref as RefObject<HTMLDivElement>}
                    className="w-full"
                >
                    <GalleryImage 
                        photo={photo}
                        gridSize={2}
                        active={false}
                    />
                </div>
                <p className="text-sm">Lorem ipsum</p>
            </div>
            <div className="fixed w-screen h-screen bg-black/80 z-10 top-0 left-0"/>
        </>
    )
}

export default ImageModal;