import { useEffect } from "react";

const useDontScrollOnCondition = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [condition])
}

export default useDontScrollOnCondition