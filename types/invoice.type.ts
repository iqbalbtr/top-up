import type { AccountInfo } from "./transaction.type";

export type InvoiceType = {
    invoice_info: {
        no: string;
        name: string;
        create_at: Date;
        expired: Date;
        status_payment: string;
        status_transaction: string;
        account: AccountInfo;
    };
    item_orders: {
        sku: string;
        name: string;
        product: string;
        quantity: number;
        price: number;
    }[];
    footer: {
        total_fee: string;
        sub_total: string;
        total: string;
    }
}