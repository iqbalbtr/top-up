import crypto from "crypto";
import products from "@/assets/json/singleProduct.json"
import type { ProductPackageType } from "~/types/product.type";
import { TriPayApiResponse } from "~/types/type";
import db from "~/drizzle/index.server";
import { transactions, orderItem as order } from "~/drizzle/schema.server";
import { sql } from "drizzle-orm";
import { TransactionRequest } from "~/types/transaction.type";
import { OrderItemTripay, PaymentTransactionTripay } from "~/types/tripay.type";


export default defineEventHandler(async event => {

    const config = useRuntimeConfig()

    let product: ProductPackageType & { product_code: string, slug: string } | undefined;
    const body = await readBody(event) as TransactionRequest;

    /**
     * Unique code for identification
     * transaction for seller
     */
    const count_ref = await db.select({ count: sql<number>`count(*)` }).from(transactions)
    var merchant_ref = body.product_code + "-" + count_ref[0].count;


    /**
     * Logic fetch product from database
     * or 3rd service you want
     */
    products.find(fo => fo.package_group.find(fa => fa.list.find(ta => {
        if (ta.code === body.product_code) {
            product = {
                ...ta,
                product_code: fo.name,
                slug: fo.slug
            }
        }
    })))

    if (!product || !product.price)
        throw createError({
            message: "Product is not found",
            status: 404
        })

    var amount = product.price * body.quantity;

    const expiry = Math.floor(Date.now() / 1000) + (2.5 * 60 * 60);
    var signature = crypto.createHmac('sha256', config.tripayPrivateKey)
        .update(config.tripayMerchantCode + merchant_ref + amount)
        .digest('hex');

    const orderItem: OrderItemTripay = {
        name: product.name,
        price: product.price,
        quantity: body.quantity,
        sku: product.code,
        product_url: `${config.public.baseUrl}/products/${product.slug}`,
        image_url: `${config.public.baseUrl}/image/${product.slug}.jpg`,
    }

    const payload = {
        method: body.method,
        merchant_ref: merchant_ref,
        amount: amount,
        customer_name: 'guest',
        customer_email: 'iqbalbahtiar045@gmail.com',
        customer_phone: body.phone || "0000000000",
        order_items: [orderItem],
        expired_time: expiry,
        signature: signature,
        return_url: `${config.public.baseUrl}/transactions/${merchant_ref}`
    }


    const result = await $fetch<TriPayApiResponse<PaymentTransactionTripay>>("https://tripay.co.id/api-sandbox/transaction/create", {
        method: "post",
        headers: {
            Authorization: `Bearer ${config.tripayApiKey}`
        },
        body: payload
    })

    if (!result.data)
        throw createError({
            message: "Internal server error",
            status: 500
        })

    await db.insert(transactions).values({
        amount: amount,
        expired: expiry,
        method: body.method,
        ref_code: merchant_ref,
        ref_transaction: result.data.reference,
        account: body.account,
        barcode: result.data.qr_url,
        pay_code: result.data.pay_code,
        pay_url: result.data.pay_url,
        status_payment: result.data.status,
        total_fee: result.data.total_fee
    }).returning()

    await db.insert(order).values({
        code_item: body.product_code,
        code_product: product.code,
        name: product.name,
        price: product.price,
        quantity: body.quantity,
        ref_code: merchant_ref,
        sub_total: product.price * body.quantity
    }).returning()


    return {
        result: {
            ref_code: merchant_ref
        },
        message: "Transaction is success"
    }
})