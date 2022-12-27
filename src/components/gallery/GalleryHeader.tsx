import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { IoOptionsOutline } from 'react-icons/io5';
import useDimensions from "../../hooks/useDimensions";
import Drawer from "../general/Drawer";
import GridSizeSelector from "./GridSizeSelector";
import TagMenu from "./TagMenu";

type GalleryHeaderProps = {
    title: string;
}

const GalleryHeader:FC<GalleryHeaderProps> = ({ title }) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false); 
    
    const { width } = useDimensions();

    useEffect(() => {
        if (width > 768) setDrawerOpen(false);
    }, [width])

    return (
        <header className="flex items-center gap-2 px-2 py-2 mb-3 shadow-lg">
            <h1 className="text-2xl md:text-4xl flex-1 font-handwriting">
                {title}
            </h1>
            <IoOptionsOutline 
                className="w-8 h-8 md:hidden cursor-pointer" 
                onClick={() => setDrawerOpen(true)}
            />
            <ul className="hidden md:flex text-2xl">
                <Link href="/">
                    <p>Album List</p>
                </Link>
            </ul>

            <Drawer 
                open={drawerOpen} 
                handleClose={() => setDrawerOpen(false)} 
            >
                <TagMenu />
                <GridSizeSelector />
            </Drawer>
        </header>
    )
};

export default GalleryHeader;