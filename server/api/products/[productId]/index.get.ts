import products from "@/assets/json/singleProduct.json";

export default defineEventHandler(async event => {

    const productId = event.context.params?.productId

    /**
     * 
     * Logic fetching data product 
     * you can add database or 3rd api your service seller
     */
    const result = products.find(fo => fo.slug === productId);

    if (!result)
        throw createError({
            status: 404,
            message: "Product is not found"
        })

    return {
        message: "success",
        result
    }
})