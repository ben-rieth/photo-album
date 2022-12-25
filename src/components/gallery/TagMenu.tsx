import type { FC } from "react"

type TagMenuProps = {
    tags: string[];
    handleClick: (filter: string | undefined) => void;
}

const TagMenu:FC<TagMenuProps> = ({ tags, handleClick }) => {
    return (
        <ul>
            {tags.map((tag) => (
                <li key={tag}>
                    <button 
                        onClick={() => handleClick(tag)}
                    >
                        {tag}
                    </button>
                </li>
            ))}
            <li>
                <button onClick={() => handleClick(undefined)}>
                    None
                </button>
            </li>
        </ul>
    )
}

export default TagMenu;