import classNames from "classnames";
import { type FC, useState } from "react"

type TagMenuProps = {
    tags: string[];
    handleClick: (filter: string | undefined) => void;
}

const TagMenu:FC<TagMenuProps> = ({ tags, handleClick }) => {
    const optionClasses = classNames(
        "w-fit bg-sky-400 rounded-2xl py-2 px-4 cursor-pointer hover:bg-white hover:ring-2 hover:ring-sky-400"
    );
    
    return (
        <ul className="mx-5 flex flex-wrap content-center justify-start gap-5">
            {tags.map((tag) => (
                <li key={tag} className={optionClasses}>
                    <button 
                        onClick={() => handleClick(tag)}
                    >
                        {tag}
                    </button>
                </li>
            ))}
            <li className={optionClasses}>
                <button onClick={() => handleClick(undefined)}>
                    None
                </button>
            </li>
        </ul>
    )
}

export default TagMenu;