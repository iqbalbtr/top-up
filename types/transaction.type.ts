import type { ProductType } from "./product.type";
import type { Instruction } from "./tripay.type";

export type AccountInfo = {
    uid: string;
    username: string;
    server?: string
}

export type TransactionRequest = {
    phone: number;
    method: string;
    product_code: string;
    account: AccountInfo;
    quantity: number;
}

interface OrderItem {
    id: number;
    ref_code: string;
    code_item: string;
    code_product: string;
    quantity: number;
    price: number;
    name: string;
    sub_total: number;
}

export interface TransactionPayment {
    id: number;
    ref_code: string;
    account: AccountInfo;
    status_transaction: 'CANCELLED' | 'SUCCESS' | 'PENDING';
    status_payment: 'PAID' | 'UNPAID';
    ref_transaction: string;
    create_at: number;
    expired: number;
    method: string;
    amount: number;
    pay_code: string;
    pay_url: string | null;
    barcode: string | null;
    order_items: OrderItem[];
    product: ProductType;
    instructions: Instruction[];
}