import classNames from "classnames";
import { useAtom } from "jotai";
import { ChangeEvent, type FC } from "react";
import { filterAtom, tagsAtom } from "../../store/filter";

const TagMenu = () => {
    
    const [filter, setFilter] = useAtom(filterAtom);
    const [tags] = useAtom(tagsAtom);

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.id);
        if (event.target.id === 'none') {
            setFilter(undefined);
            return;
        }
        
        setFilter(event.target.id);
    }
    
    return (
        <fieldset className="text-black">
            <legend>Filter By Tags</legend>
            <div onChange={onValueChange}>
                {tags.map((tag) => (
                    <div key={`tagOption-${tag}`} className="flex items-center gap-2">
                        <input 
                            type="radio" 
                            id={tag} 
                            name="photoTags"
                            checked={filter === tag}
                            readOnly
                        />
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                ))}
                <div key={`tagOption-none`} className="flex items-center gap-2">
                    <input 
                        type="radio" 
                        id="none" 
                        name="photoTags"
                        checked={!filter}
                        readOnly
                    />
                    <label htmlFor="none">none</label>
                </div>
            </div>
        </fieldset>
    )
}

export default TagMenu;