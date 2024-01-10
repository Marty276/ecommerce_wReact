export const setCategories = (productsList) => {
    const categories = []

    for (let i in productsList) {
        if (!categories.includes(productsList[i].category)) {
            categories.push(productsList[i].category)
        }
    }

    return ["all", ...categories]
}