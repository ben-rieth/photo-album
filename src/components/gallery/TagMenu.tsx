import { useAtom } from "jotai";
import { useId, type ChangeEvent } from "react";
import { filterAtom, tagsAtom } from "../../store/filter";

const TagMenu = () => {
    
    const [filter, setFilter] = useAtom(filterAtom);
    const [tags] = useAtom(tagsAtom);

    const instanceId = useId();

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'none') {
            setFilter(undefined);
            return;
        }
        
        setFilter(event.target.value);
    }

    return (
        <fieldset className="text-black">
            <legend className="text-xl">Filter By Tags</legend>
            <div className="pl-3">
                {tags.map((tag) => (
                    <div key={`tagOption-${tag}`} className="flex items-center gap-2">
                        <input 
                            type="radio" 
                            id={`${instanceId}-${tag}`} 
                            name={`${instanceId}-photoTags`} 
                            checked={filter === tag}
                            onChange={onValueChange}
                            value={tag}
                        />
                        <label htmlFor={`${instanceId}-${tag}`} >{tag}</label>
                    </div>
                ))}
                <div key={`tagOption-none`} className="flex items-center gap-2">
                    <input 
                        type="radio" 
                        id={`${instanceId}-none`} 
                        name={`${instanceId}-photoTags`} 
                        checked={filter === undefined}
                        onChange={onValueChange}
                        value="none"
                    />
                    <label htmlFor={`${instanceId}-none`} >none</label>
                </div>
            </div>
        </fieldset>
    )
}

export default TagMenu;