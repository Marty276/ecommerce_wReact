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