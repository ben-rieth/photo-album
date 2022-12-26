import Link from "next/link";
import { type FC } from "react";
import { AiOutlineLeft } from 'react-icons/ai';
import { IoOptionsOutline } from 'react-icons/io5';

type GalleryHeaderProps = {
    title: string;
}

const GalleryHeader:FC<GalleryHeaderProps> = ({ title }) => {
    return (
        <header className="flex items-center gap-2 px-2 py-2 mb-3">
            <Link href='/'>
                <AiOutlineLeft className="w-6 h-6"/>
            </Link>
            <h1 className="text-3xl flex-1">
                {title}
            </h1>
            <IoOptionsOutline className="w-8 h-8" />
        </header>
    )
};

export default GalleryHeader;