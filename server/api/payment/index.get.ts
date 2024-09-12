import { PaymentType } from "~/types/tripay.type"

export default defineEventHandler(async event => {

    const config = useRuntimeConfig()

    /**
     * 
     * Get all payment method from tripay
     */

    const list = await $fetch('https://tripay.co.id/api-sandbox/merchant/payment-channel', {
        headers: {
            Authorization: `Bearer ${config.tripayApiKey}`
        }
    }) as any

    if (!list.data)
        throw createError({
            message: "Internal server error",
            status: 500
        })

    return {
        result: list.data as PaymentType[],
        message: "success"
    }
})