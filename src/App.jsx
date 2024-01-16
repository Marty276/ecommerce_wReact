import { useEffect, useRef, useState } from "react"
import productsList from "./product_list.json"
import "./styles/styles.css"
import { ProductCard, ProductDetails } from "./components/Products"
import { FiltersSection } from "./components/Filters"
import { applyFilters } from "./logic/tools"
import { setCategories } from "./consts/categories"
import { CartSection } from "./components/Cart"
import { CheckOutSecion } from "./components/CheckOut"
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

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
    const [isCheckOutOpened, setIsCheckOutOpened] = useState(false)

    function changeCheckOutVisibility(){
        setIsCheckOutOpened(!isCheckOutOpened)
    }

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

            
            <button className="cart_button" onClick={changeCartVisibility}>
                {
                    isCartOpened 
                    ? <IoMdCloseCircle size="2.5em" color="#000000"/>
                    : <FaShoppingCart size="2em" color="#000000"/>
                }
            </button>
            
            <header className="page_header">
                <input onChange={handleQueryChange} className="query_input" type="text" placeholder="Search for your products here..."/>
                <FiltersSection categories={categories} setFilters={setFilters} />
            </header>

            { isCartOpened && <CartSection closeCart={changeCartVisibility} openCheckOut={changeCheckOutVisibility}/> }
            { isCheckOutOpened && <CheckOutSecion closeCheckOut={changeCheckOutVisibility} openCart={changeCartVisibility}/> }
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