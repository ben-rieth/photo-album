import type { FC } from "react";

type TagProps = {
    text: string;
}

const Tag:FC<TagProps> = ({ text }) => {
    return (
        <p 
            className="bg-sky-800/70 text-sky-500 rounded-full px-4 py-1"
        >
            {text}
        </p>
    )
}

export default Tag;