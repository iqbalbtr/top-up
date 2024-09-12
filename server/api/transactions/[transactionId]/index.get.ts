import { TriPayApiResponse } from "~/types/type"
import type { PaymentTransactionTripay } from "~/types/tripay.type"
import products from "~/assets/json/singleProduct.json"
import db from "~/drizzle/index.server"
import { orderItem, transactions } from "~/drizzle/schema.server"
import { eq } from "drizzle-orm"

export default defineEventHandler(async event => {

    const config = useRuntimeConfig()
    let isStatusPayment: string | undefined

    const transactionId = event.context.params?.transactionId!

    const invoice = await db.query.transactions.findFirst({
        with: {
            order_items: true
        },
        where: eq(transactions.ref_code, transactionId)
    })

    if (!invoice)
        throw createError({
            message: "Transaction is not found",
            status: 404
        })

    if (
        invoice.expired < Math.floor(Date.now() / 1000) &&
        invoice.status_payment === 'UNPAID'
    ) {
        await db.update(transactions).set({
            status_payment: 'EXPIRED',
            status_transaction: 'CANCELLED'
        }).where(eq(transactions.ref_code, transactionId))
        isStatusPayment = 'EXPIRED'
    }


    const req = await $fetch<TriPayApiResponse<PaymentTransactionTripay>>(`https://tripay.co.id/api-sandbox/transaction/detail`, {
        method: "get",
        params: {
            reference: invoice.ref_transaction
        },
        headers: {
            Authorization: `Bearer ${config.tripayApiKey}`
        }
    })

    if (!req.data) {
        throw createError({
            message: "Transaction not found",
            status: 404
        })
    }

    const getProduct = products.find(fo => fo.package_group.find(fi => fi.list.find(fa => fa.code === req.data.order_items[0].sku)))

    if (!getProduct) {
        throw createError({
            message: "Transaction not found",
            status: 404
        })
    }
    const { package_group, ...product } = getProduct

    return {
        message: "Transaction found",
        result: {
            ...invoice,
            ...(isStatusPayment && {
                status_payment: 'EXPIRED',
                status_transaction: 'CANCELLED'
            }),
            product,
            instructions: req.data.instructions
        }
    }
})