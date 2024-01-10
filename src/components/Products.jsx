export function ProductCard({ product, openProductDetails }){

    function handleClick(){
        openProductDetails(product)
    }

    return <article className="product_card">
        <img src={product.thumbnail} onClick={handleClick}/>
        <div className="product_text">
            <h3 onClick={handleClick} >{product.title}</h3>
            <h4>${product.price} ({product.discountPercentage}% discount)</h4>
            <h5>Rating: {product.rating} {"★".repeat(Math.round(product.rating))}</h5>
            <span>{product.brand} • {product.category}</span>
            <p>{product.description}</p>
        </div>
    </article>
}

export function ProductDetails({ product, openProductDetails }){

    function handleClick(){
        openProductDetails(undefined)
    }
    

    return  <div className="modal_shadow" onClick={handleClick}>
        <section className="product_details">
            <img src={product.images[0]} style={{width: "400px", aspectRatio: "3/2", objectFit: "contain"}} />
            <h2>{product.title}</h2>
            <button>Add to cart</button>
            <h4>${product.price} ({product.discountPercentage}% discount)</h4>
            <h5>Rating: {product.rating} {"★".repeat(Math.round(product.rating))}</h5>
            <h5>Stock: {product.stock}</h5>
            <span>{product.brand} • {product.category}</span>
            <p>{product.description}</p>
        </section>
    </div>
}