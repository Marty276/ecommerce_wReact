import { useContext } from "react"
import { CartContext } from "../contexts/Cart"
import productsList from "../product_list.json"

export function CartSection({ closeCart }){

    const {cart, changeProductAmount, removeCartProduct} = useContext(CartContext)

    return <div className="modal_shadow">
        <section className="details_modal">
            <button onClick={closeCart}>Close Cart</button>

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