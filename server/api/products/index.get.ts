import products from "@/assets/json/products.json"

export default defineEventHandler(async event => {

    /**
     * 
     * Logic get all product from database 
     * or 3rd service
     */

    const { type } = getQuery(event);

    const result = type == 'popular' ?
        products.slice(0, 4) :
        type == 'recomendation' ?
            products.slice(0, 1) :
            products

    return {
        message: "success",
        result
    }
})