import { createContext, useEffect, useState } from "react"
export const CartContext = createContext()

export function CartProvider({ children }){

    const [cart, setCart] = useState(
        JSON.parse(window.localStorage.getItem("cart"))
        || {}
    )

    function removeCartProduct(id){
        setCart(currentCart => {
            const newCart = {...currentCart}
            delete newCart[id]
            return newCart
        })
    }

    function changeProductAmount(id, add){
        if (cart[id] === 1 && !add){
            removeCartProduct(id)
        }else{
            setCart(currentCart => {
                const newCart = {...currentCart}
                newCart[id] = newCart[id] + (add ? 1 : -1) || 1
                return newCart
            })
        }
    }

    function clearCart(){
        setCart({})
    }

    useEffect(()=>{
        window.localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return <CartContext.Provider value={{
        cart,
        changeProductAmount,
        removeCartProduct,
        clearCart
    }}>
        {children}
    </CartContext.Provider>
}