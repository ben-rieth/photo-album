import { TfiLayoutGrid2, TfiLayoutGrid3, TfiLayoutGrid4 } from 'react-icons/tfi';
import { BiSquare } from 'react-icons/bi';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { gridAtom } from '../../store/filter';

const GridSizeSelector = () => {

    const [gridSize, setGridSize] = useAtom(gridAtom);

    const iconClasses = (sizeOption: number) => {
        return classNames(
            "pointer-events-none w-6 h-6",
            {
                "fill-black": sizeOption !== gridSize,
                "fill-sky-500": sizeOption === gridSize,
            }
        );
    }

    const liClasses = (sizeOption: number) => {

        return classNames(
            "cursor-pointer gap-3 items-center",
            {
                "text-black": sizeOption !== gridSize,
                "text-sky-500": sizeOption === gridSize,
            }
        );
    }

    return (
        <div className="w-fit">
            <p className="text-black text-xl">Select Grid Size</p>
            <ul className="flex flex-col gap-2 pl-3">
                <li 
                    className={`lg:hidden flex ${liClasses(1)}`} 
                    onClick={() => setGridSize(1)}
                >
                    <BiSquare className={iconClasses(1)}/>
                    <p>One Column</p>
                </li>
                <li 
                    className={`flex ${liClasses(2)}`} 
                    onClick={() => setGridSize(2)}
                >
                    <TfiLayoutGrid2 className={iconClasses(2)}/>
                    <p>Two Columns</p>
                </li>
                <li 
                    className={`hidden md:flex ${liClasses(3)}`} 
                    onClick={() => setGridSize(3)}
                >
                    <TfiLayoutGrid3 className={iconClasses(3)}/>
                    <p>Three Columns</p>
                </li>
                <li 
                    className={`hidden xl:flex ${liClasses(4)}`} 
                    onClick={() => setGridSize(4)}
                >
                    <TfiLayoutGrid4 className={iconClasses(4)}/>
                    <p>Four Columns</p>
                </li>
            </ul>
        </div>
    )
}

export default GridSizeSelector;