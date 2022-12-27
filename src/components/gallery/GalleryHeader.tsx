import Link from "next/link";
import { useState, type FC } from "react";
import { AiOutlineLeft } from 'react-icons/ai';
import { IoOptionsOutline } from 'react-icons/io5';
import Drawer from "../general/Drawer";
import GridSizeSelector from "./GridSizeSelector";
import TagMenu from "./TagMenu";

type GalleryHeaderProps = {
    title: string;
}

const GalleryHeader:FC<GalleryHeaderProps> = ({ title }) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false); 
    
    return (
        <header className="flex items-center gap-2 px-2 py-2 mb-3">
            <h1 className="text-2xl md:text-4xl flex-1">
                {title}
            </h1>
            <IoOptionsOutline 
                className="w-8 h-8 md:hidden" 
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