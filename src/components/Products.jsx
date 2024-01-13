import { applyFilters } from "../logic/tools"
import { CartContext } from "../contexts/Cart"
import { useContext } from "react"

export function ProductCard({ product, openProductDetails }){

    function handleClick(){
        openProductDetails(product)
    }

    return <article className="product_card">
        <img alt={"an image of " + product.title} src={product.thumbnail} onClick={handleClick}/>
        <div className="product_text">
            <h3 onClick={handleClick} >{product.title}</h3>
            <h4>${product.price} ({product.discountPercentage}% discount)</h4>
            <h5>Rating: {product.rating} {"★".repeat(Math.round(product.rating))}</h5>
            <span>{product.brand} • {product.category}</span>
            <p>{product.description}</p>
        </div>
    </article>
}

export function ProductDetails({ product, openProductDetails, productsList }){

    const similarProducts = applyFilters(productsList, {min: undefined, max: undefined, category: product.category})
        .filter(similarProduct => similarProduct !== product)
    const {changeProductAmount} = useContext(CartContext)

    function closeModal(){
        openProductDetails(undefined)
    }
    
    function handleAddToCart(){
        changeProductAmount(product.id, true)
    }

    return  <div className="modal_shadow">
        <section className="details_modal">
            <button onClick={closeModal}>close</button>
            

            <img src={product.images[0]} style={{width: "400px", aspectRatio: "3/2", objectFit: "contain"}} />
            <h2>{product.title}</h2>
            <button onClick={handleAddToCart}>Add to cart</button>

            <div className="product_details_text">
                <h4>${product.price} ({product.discountPercentage}% discount)</h4>
                <h5>Rating: {product.rating} {"★".repeat(Math.round(product.rating))}</h5>
                <h5>Stock: {product.stock}</h5>
                <span>{product.brand} • {product.category}</span>
                <p>{product.description}</p>
            </div>

            <section className="r_products_section">

                <header><h3>También podría interesarte:</h3></header>

                {similarProducts.map(product => {
                    return <article key={product.id} className="r_product_card" style={{display: "flex"}} onClick={()=>openProductDetails(product)}>
                        <img alt={"an image of " + product.title} src={product.thumbnail} style={{width: "100px", aspectRatio: "3/2", objectFit: "cover"}}/>
                        <div>
                            <h4>{product.title}</h4>
                            <h5>{product.price}</h5>
                            <p>{product.description}</p>
                        </div>
                    </article>
                })}

            </section>

        </section>
    </div>
}