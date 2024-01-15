export function applyFilters(products, filters) {

    let newFilteredProducts = products

    if (filters.min) {
        newFilteredProducts = newFilteredProducts.filter((product) => product.price >= filters.min)
    }
    if (filters.max) {
        newFilteredProducts = newFilteredProducts.filter((product) => product.price <= filters.max)
    }
    if (filters.category !== "all") {
        newFilteredProducts = newFilteredProducts.filter((product) => product.category == filters.category)
    }

    return newFilteredProducts
}

export function roundToTwoDecimals(n){
    return Math.round(n * 100) / 100
}

export function getArrivingDate(days){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    let date = new Date()
    date.setDate(date.getDate() + days)

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function calculateProductsTotals(cart, products){

    let totalAmount = 0

    const productsTotals = Object.entries(cart).map(productCartInfo=>{
        
        const productInfo = products.find(product => product.id == productCartInfo[0])
        const finalPriceValue = roundToTwoDecimals((productInfo.price - ((productInfo.price / 100) * productInfo.discountPercentage)))
        const totalValue = roundToTwoDecimals((finalPriceValue * productCartInfo[1]))
        totalAmount += totalValue
        
        return {
            id: productCartInfo[0],
            title: productInfo.title,
            normalPrice: productInfo.price,
            discount: productInfo.discountPercentage,
            finalPrice: finalPriceValue,
            amount: productCartInfo[1],
            total: totalValue,
        }
    }
    )

    totalAmount = roundToTwoDecimals(totalAmount)

    return {productsTotals, totalAmount}
}