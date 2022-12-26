import { type FC } from "react";
import classNames from "classnames";
import { AiOutlineClose } from 'react-icons/ai';
import useDontScrollOnCondition from "../../hooks/useDontScrollOnCondition";

type DrawerProps = {
    open: boolean;
    children: JSX.Element | JSX.Element[];
    handleClose: () => void;
}

const Drawer:FC<DrawerProps> = ({ open, handleClose, children }) => {
    
    useDontScrollOnCondition(open);

    const drawerClasses = classNames(
        "fixed top-0 left-0 w-3/4 z-30 h-full",
        "transform transition-transform duration-500",
        "bg-white backdrop-blur-md",
        "text-neutral-900 dark:text-neutral-100",
        {
            "translate-x-0 ease-out" : open,
            "-translate-x-full ease-in": !open
        }
    );

    const closeClasses = classNames(
        "fixed top-4 right-4 cursor-pointer fill-white z-30 transition-opacity duration-500",
        "h-12 w-12 ml-2",
        {
            "opacity-0 pointer-events-none ease-in": !open,
            "opacity-100 ease-out": open,
        }
    );

    const overlayClasses = classNames(
        "fixed bg-black top-0 left-0 w-full h-full z-20 transition-opacity duration-500",
        {
            "opacity-0 pointer-events-none ease-in": !open,
            "opacity-50 ease-out": open,
        }
    )

    return (
        <>
            <aside className={drawerClasses}>
                <ul className="mt-20 ml-14 text-3xl w-64">
                    {children}
                </ul>
            </aside>
            <AiOutlineClose 
                className={closeClasses}
                onClick={handleClose}
            />
            <div 
                className={overlayClasses}
                onClick={handleClose}
            />
        </>
    )
};

export default Drawer;