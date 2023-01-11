import { type FC } from "react";

type CaptionProps = {
    text: string | null;
}

const Caption:FC<CaptionProps> = ({ text }) => {
    return (
        <p className="font-scrawl text-lg">
            {text ? text : ""}
        </p>
    )
}

export default Caption;