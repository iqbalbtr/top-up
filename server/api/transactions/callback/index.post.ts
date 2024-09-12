import crypto from "crypto"
import { eq } from "drizzle-orm";
import db from "~/drizzle/index.server";
import { transactions } from "~/drizzle/schema.server";
import { CallbackTransactionTripay } from "~/types/tripay.type"; 

export default defineEventHandler(async event => {

    const config = useRuntimeConfig()
    const body = await readBody(event) as CallbackTransactionTripay;

    const signature = crypto.createHmac("sha256", config.tripayPrivateKey)
        .update(JSON.stringify(body))
        .digest('hex');

    await db.update(transactions).set({
        status_transaction: 'SUCCESS',
        status_payment: body.status
    }).where(eq(transactions.ref_transaction, body.reference))

    /**
     * 
     * Handle top up logic
     * update transaction 
     */

    return {
        message: "success",
        result: true
    }

})