import { useRef } from "react";

export function FiltersSection({categories, setFilters}) {

    function clearNumericInputs(e){
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        e.target.value = (e.target.value).split("").filter((char) => numbers.includes(char)).join("");
    }

    const minRef = useRef()
    const maxRef = useRef()
    const categoryRef = useRef()

    function handleSubmit(e){
        e.preventDefault()
        setFilters({
            min: minRef.current.value,
            max: maxRef.current.value,
            category: categoryRef.current.value
        })
    }
    
    return <section>
        <form onSubmit={handleSubmit}>
            <label>
                min<input ref={minRef} name="min" onChange={clearNumericInputs}/>
            </label>
            <label>
                max<input ref={maxRef} name="max" onChange={clearNumericInputs}/>
            </label>
            <select ref={categoryRef} name="category">
                {categories.map((category, id)=>{
                    return <option key={category + id} value={category}>{category.replace("-", " ")}</option>
                })}
            </select>
            <button>Apply filters</button>
        </form>
    </section>
}