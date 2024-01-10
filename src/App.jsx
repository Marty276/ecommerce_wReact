import { useEffect, useRef, useState } from "react"
import productsList from "./product_list.json"
import "./styles/styles.css"
import { ProductCard, ProductDetails } from "./components/Products"
import { FiltersSection } from "./components/Filters"
import { applyFilters } from "./logic/tools"
import { setCategories } from "./consts/categories"

export function App() {
    const [filteredProducts, setFilteredProducts] = useState(productsList)
    const [filters, setFilters] = useState({
        min: undefined,
        max: undefined,
        category: "all",
    })
    const categories = setCategories(productsList)
    const [openedProduct, setOpenedProduct] = useState()

    function openProductDetails(product){
        setOpenedProduct(product)
    }

    useEffect(()=>{
        if(filteredProducts){
            setFilteredProducts(applyFilters(productsList, filters))
        }
    }, [filters])
    
    return (
        
        <main>

            {
                openedProduct && <ProductDetails openProductDetails = {openProductDetails} product={openedProduct}/>
            }

            <FiltersSection categories={categories} setFilters={setFilters}/>
            <section className="products_section">
                {
                    filteredProducts.map((product)=>{
                        return <ProductCard openProductDetails = {openProductDetails} product = {product} key={product.id}/>
                    })
                }
            </section>

        </main>
    )
}