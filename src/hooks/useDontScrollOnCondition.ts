import { useEffect } from "react";

const useDontScrollOnCondition = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [condition])
}

export default useDontScrollOnCondition