import { useContext, useState } from "react"
import { CartContext } from "../contexts/CartContext"
import productsList from "../product_list.json"
import { CheckOutSecion } from "./CheckOut"

export function CartSection({ closeCart, openCheckOut }){

    const {cart, changeProductAmount, removeCartProduct} = useContext(CartContext)
    
    function handleOpenCheckOut(){
        openCheckOut()
        closeCart()
    }

    return <div className="modal_shadow">
        <section className="details_modal">
            <button onClick={closeCart}>Close Cart</button>

            {
                Object.keys(cart).length > 0
                && <button onClick={handleOpenCheckOut}>Proceed to check out</button>
            }


            {
                Object.entries(cart).map(productData => {

                    function add(){
                        changeProductAmount(productData[0], true)
                    }
                    function substract(){
                        changeProductAmount(productData[0], false)
                    }
                    function remove(){
                        removeCartProduct(productData[0])
                    }
                    return <div key={productData[0]}>
                        <h2>{productsList.find(product => product.id == productData[0]).title}</h2>
                        <h3>Amount: {productData[1]}</h3>
                        <button onClick={add}>+</button>
                        <button onClick={substract}>-</button>
                        <button onClick={remove}>remove product</button>
                    </div>
                })
            }
        </section>
    </div>
}