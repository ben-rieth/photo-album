import { useLayoutEffect, useState } from "react";

type Dimensions = {
    width: number;
    height: number;
}

const useDimensions = () => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0
    });

    const updateToCurrentSize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    let resizeTimer: NodeJS.Timeout;

    const resizeFn = () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(updateToCurrentSize, 150);
    }

    if (typeof window !== 'undefined') window.addEventListener('resize', resizeFn);

    useLayoutEffect(() => {
        updateToCurrentSize()
    }, []);

    return dimensions;
}

export default useDimensions;