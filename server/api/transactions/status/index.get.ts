import { eq } from "drizzle-orm"
import db from "~/drizzle/index.server"
import { transactions } from "~/drizzle/schema.server"
import { TriPayApiResponse } from "~/types/type"

export default defineEventHandler(async event => {
    const config = useRuntimeConfig()

    const { invoice } = getQuery(event)

    if (!invoice || typeof invoice !== 'string')
        throw createError({
            status: 404
        })

    const result = await db.select().from(transactions).where(eq(transactions.ref_code, invoice))

    if (result.length == 0)
        throw createError({
            message: 'Transaction is not found',
            status: 404
        })

    const getTimeout = async (retry: number = 0) => {

        if (retry > 5)
            throw createError({
                status: 500,
                message: 'Internal server error'
            })

        const req = await $fetch<TriPayApiResponse<boolean>>(`https://tripay.co.id/api-sandbox/transaction/check-status?reference=${result[0].ref_transaction}`, {
            headers: {
                Authorization: `Bearer ${config.tripayApiKey}`
            },
        })

        const code = req.message.split(" ").slice(-1)[0]

        if (!req.success && retry < 5) {
            setTimeout(() => getTimeout(retry++), 5000)
        } else if (
            result[0].expired < Math.floor(Date.now() / 1000) &&
            result[0].status_payment === 'UNPAID'
        ) {
            await db.update(transactions).set({
                status_payment: 'EXPIRED',
                status_transaction: 'CANCELLED'
            }).where(eq(transactions.ref_code, invoice))
            return {
                message: "success",
                result: 'UNPAID'
            }
        } else if (code.includes('DIBAYAR')) {

            if (!result[0].ref_transaction.includes('PAID'))
                await db.update(transactions).set({
                    status_payment: 'PAID',
                    status_transaction: 'SUCCESS'
                }).where(eq(transactions.ref_code, invoice))

            return {
                message: "success",
                result: 'UNPAID'
            }
        } else {
            setTimeout(() => getTimeout(retry), 5000)
        }
    }

    await getTimeout()
})