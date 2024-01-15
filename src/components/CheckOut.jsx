import { useContext, useEffect, useRef, useState } from "react"
import { CartContext } from "../contexts/CartContext"
import productsList from "../product_list.json"
import { calculateProductsTotals, roundToTwoDecimals, getArrivingDate } from "../logic/tools"

function ShippingForm({ handleSubmit }) {
    return <form onSubmit={handleSubmit}>

        <h2>Shipping Info</h2>

        <label>
            <span>Please provide a shipping address:</span>
            <br />
            <input name="shipping_address" required />
        </label>

        <span>Please select a shipping option:</span>
        <br />
        <label>
            <input type="radio" name="delivery_option" value="normal" required />
            <span>Normal delivery</span><br />
        </label>
        <label>
            <input type="radio" name="delivery_option" value="fast" />
            <span>Fast delivery</span><br />
        </label>
        <label>
            <input type="radio" name="delivery_option" value="urgent" />
            <span>Urgent delivery</span><br />
        </label>

        <button>continue</button>
    </form>
}

function TotalAmountConfirmation({ nextStep, previousStep, deliveryFees, updateOrderAmount }) {

    const { cart } = useContext(CartContext)
    const { productsTotals, totalAmount } = calculateProductsTotals(cart, productsList)
    const taxesPercentage = 6.5
    const taxes = roundToTwoDecimals(((totalAmount / 100) * taxesPercentage))
    const orderAmount = roundToTwoDecimals(totalAmount + deliveryFees + taxes)
    updateOrderAmount(orderAmount)

    return <>
        <h2>Order amount</h2>

        {
            productsTotals.map(productInfo => {
                return <div key={productInfo.id}>
                    <p><strong>{productInfo.title}</strong></p>
                    <p>Price: ${productInfo.normalPrice} - %{productInfo.discount} = ${productInfo.finalPrice}</p>
                    <p>Total: {productInfo.amount} x ${productInfo.finalPrice} = <strong>${productInfo.total}</strong></p>
                </div>
            })
        }

        <p><strong>Subtotal: {totalAmount}</strong></p>
        <p><strong>Taxes (%{taxesPercentage}): ${taxes}</strong></p>
        <p><strong>Delivery fees: {deliveryFees}</strong></p>
        <h3><strong>Total: {orderAmount}</strong></h3>

        <button onClick={previousStep}>go back</button>
        <button onClick={nextStep}>continue</button>
    </>
}

export function CheckOutSecion({ closeCheckOut, openCart }) {

    const addressRef = useRef()
    const [shippingInfo, setShippingInfo] = useState({
        shipping_address: undefined,
        delivery_option: undefined
    })
    const [checkOutStep, setCheckOutStep] = useState(1)
    const deliveryOptions = {
        "normal": { price: 0, days: 15 },
        "fast": { price: 10, days: 7 },
        "urgent": { price: 25, days: 2 }
    }
    const orderAmount = useRef(0)

    const { clearCart } = useContext(CartContext)

    function handleCloseCheckOut() {
        openCart()
        closeCheckOut()
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formDataObj = new FormData(e.target)

        setShippingInfo({
            shipping_address: formDataObj.get("shipping_address"),
            delivery_option: formDataObj.get("delivery_option")
        })

        nextStep()
    }

    function nextStep() {
        setCheckOutStep(checkOutStep + 1)
    }
    function previousStep() {
        setCheckOutStep(checkOutStep - 1)
    }
    function updateOrderAmount(n){
        orderAmount.current = n
    }

    useEffect(()=>{
        if (checkOutStep === 3){
            clearCart()
        }
    }, [checkOutStep])

    return <div className="modal_shadow">
        <section className="details_modal">
            
            { checkOutStep !== 3 && <button onClick={handleCloseCheckOut}>Go back to cart</button>}
            
            <br/>

            {checkOutStep === 1 && <>
                <h2>Step 1</h2>
                <ShippingForm handleSubmit={handleSubmit} />
            </>}

            {checkOutStep === 2 && <>
                <h2>Step 2</h2>
                <TotalAmountConfirmation updateOrderAmount={updateOrderAmount} nextStep={nextStep} previousStep={previousStep} deliveryFees={deliveryOptions[shippingInfo.delivery_option].price} />
            </>}

            {checkOutStep === 3 && <>
                <h2>Perfect!</h2>
                <p>Your order for ${orderAmount.current} will be arriving by {getArrivingDate(deliveryOptions[shippingInfo.delivery_option].days)} to {shippingInfo.shipping_address}</p>
                <button onClick={closeCheckOut}>Go back to home page</button>
            </>}
        </section>
    </div>
}