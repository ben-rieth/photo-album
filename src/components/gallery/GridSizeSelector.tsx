import { TfiLayoutGrid2, TfiLayoutGrid3, TfiLayoutGrid4 } from 'react-icons/tfi';
import { BiSquare } from 'react-icons/bi';
import type { FC } from 'react';
import classNames from 'classnames';

type GridSizeSelectorProps = {
    handleChange: (size: number) => void;
};

const GridSizeSelector:FC<GridSizeSelectorProps> = ({ handleChange }) => {

    const classes = classNames(
        "cursor-pointer border-2 border-sky-500 w-10 h-10 items-center justify-center"
    );

    const iconClasses = classNames(
        "w-5 h-5 pointer-events-none"
    );

    return (
        <ul className="flex justify-around items-center">
            <li 
                className={`lg:hidden flex ${classes}`} 
                onClick={() => handleChange(1)}
            >
                <BiSquare className={iconClasses}/>
            </li>
            <li 
                className={`flex ${classes}`} 
                onClick={() => handleChange(2)}
            >
                <TfiLayoutGrid2 className={iconClasses}/>
            </li>
            <li 
                className={`hidden md:flex ${classes}`} 
                onClick={() => handleChange(3)}
            >
                <TfiLayoutGrid3 className={iconClasses}/>
            </li>
            <li 
                className={`hidden xl:flex ${classes}`} 
                onClick={() => handleChange(4)}
            >
                <TfiLayoutGrid4 className={iconClasses}/>
            </li>
        </ul>
    )
}

export default GridSizeSelector;