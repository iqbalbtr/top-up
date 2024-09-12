import { eq } from "drizzle-orm";
import db from "~/drizzle/index.server";
import { transactions } from "~/drizzle/schema.server";
import { InvoiceType } from "~/types/invoice.type";
import { createInvoice } from "~/utils/invoice.server";

export default defineEventHandler(async event => {

    const transactionId = event.context.params?.transactionId!

    const result = await db.query.transactions.findFirst({
        with: {
            order_items: true
        },
        where: eq(transactions.ref_code, transactionId)
    })

    if (!result)
        throw createError({
            message: "Transaction is not found",
            status: 404
        })


    const invoice: InvoiceType = {
        invoice_info: {
            account: {
                uid: result.account?.uid!,
                username: result.account?.username!,
                server: result.account?.server!,
            },
            create_at: new Date(result.create_at * 1000),
            expired: new Date(result.expired * 1000),
            no: result.ref_code,
            name: 'Guest',
            status_payment: result.status_payment!,
            status_transaction: result.status_transaction!
        },
        item_orders: result.order_items.map(fo => ({
            sku: fo.code_item,
            name: fo.code_item,
            product: fo.code_product,
            price: fo.price,
            quantity: fo.quantity
        })),
        footer: {
            sub_total: result.order_items.reduce((acc, req) => acc += req.sub_total, 0).toString(),
            total_fee: result.total_fee.toString(),
            total: (result.order_items.reduce((acc, req) => acc += req.sub_total, 0) + result.total_fee).toString()
        }
    };

    setHeader(event, "Content-Type", "application/pdf")
    setHeader(event, 'content-disposition', `attachment; filename=${result.ref_code}-invoice.pdf`)
    return createInvoice(invoice);
})