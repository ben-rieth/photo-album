import { type FC } from "react";
import classNames from "classnames";
import { AiOutlineClose } from 'react-icons/ai';
import TagMenu from "../gallery/TagMenu";
import useDontScrollOnCondition from "../../hooks/useDontScrollOnCondition";

type DrawerProps = {
    open: boolean;
    handleClose: () => void;
}

const Drawer:FC<DrawerProps> = ({ open, handleClose }) => {
    
    useDontScrollOnCondition(open);

    const drawerClasses = classNames(
        "fixed top-0 left-0 w-full z-30 h-full",
        "transform ease-in-out transition-transform duration-500",
        "bg-white/70 backdrop-blur-md",
        "text-neutral-900 dark:text-neutral-100",
        {
            "translate-x-0" : open,
            "-translate-x-full": !open
        }
    );

    const closeClasses = classNames(
        "fixed top-4 right-4 cursor-pointer fill-black",
        "h-12 w-12 ml-2",
        {
            "hidden": !open
        },
    );

    return (
        <aside className={drawerClasses}>
            <AiOutlineClose 
                className={closeClasses}
                onClick={handleClose}
            />
            <ul className="mt-20 ml-14 text-3xl md:text-5xl w-64">
                <TagMenu />
            </ul>
        </aside>
    )
};

export default Drawer;