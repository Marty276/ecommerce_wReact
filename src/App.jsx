import { useEffect, useRef, useState } from "react"
import productsList from "./product_list.json"
import "./styles/styles.css"
import { ProductCard, ProductDetails } from "./components/Products"
import { FiltersSection } from "./components/Filters"
import { applyFilters } from "./logic/tools"
import { setCategories } from "./consts/categories"
import { CartSection } from "./components/Cart"

export function App() {
    const [filteredProducts, setFilteredProducts] = useState(productsList)
    const [filters, setFilters] = useState({
        min: undefined,
        max: undefined,
        category: "all",
    })
    const categories = setCategories(productsList)
    const [openedProduct, setOpenedProduct] = useState()
    const [query, setQuery] = useState("")
    const [isCartOpened, setCartOpened] = useState(false)

    function openProductDetails(product) {
        setOpenedProduct(product)
    }

    function handleQueryChange(e) {
        setQuery(e.target.value)
    }

    function changeCartVisibility(){
        setCartOpened(!isCartOpened)
    }

    useEffect(() => {
        if (filteredProducts) {
            setFilteredProducts(applyFilters(productsList, filters))
        }
    }, [filters])


    return (

        <main>

            {
                openedProduct && <ProductDetails openProductDetails={openProductDetails} product={openedProduct} productsList={productsList}/>
            }

            <FiltersSection categories={categories} setFilters={setFilters} />

            <input onChange={handleQueryChange} /><button onClick={changeCartVisibility}>See Cart</button>

            { isCartOpened && <CartSection closeCart={changeCartVisibility}/>}

            <section className="products_section">
                {
                    filteredProducts.map((product) => {
                        return query !== ""
                            ? (
                                product.title.toLowerCase().includes(query.toLowerCase())
                                || product.brand.toLowerCase().includes(query.toLowerCase())
                                || product.category.toLowerCase().includes(query.toLowerCase())
                            ) && <ProductCard openProductDetails={openProductDetails} product={product} key={product.id} />
                            : <ProductCard openProductDetails={openProductDetails} product={product} key={product.id} />

                    })
                }
            </section>

        </main>
    )
}