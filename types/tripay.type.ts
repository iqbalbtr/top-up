type InstructionStep = string;

export type Instruction = {
    title: string;
    steps: InstructionStep[];
};

export interface OrderItemTripay {
    sku: string;
    name: string;
    price: number;
    quantity: number;
    subtotal?: number;
    product_url?: string;
    image_url?: string;
}

export type PaymentTransactionTripay = {
    reference: string;
    merchant_ref: string;
    payment_selection_type: string;
    payment_method: string;
    payment_name: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    callback_url: string;
    return_url: string;
    amount: number;
    fee_merchant: number;
    fee_customer: number;
    total_fee: number;
    amount_received: number;
    pay_code: string;
    pay_url: string | null;
    checkout_url: string;
    status: string;
    paid_at: number;
    expired_time: number;
    order_items: OrderItemTripay[];
    instructions: Instruction[];
    qr_string?: string;
    qr_url?: string;
};

export type CallbackTransactionTripay = {
    reference: string;
    merchant_ref: string;
    payment_method: string;
    payment_method_code: string;
    total_amount: number;
    fee_merchant: number;
    fee_customer: number;
    total_fee: number;
    amount_received: number;
    is_closed_payment: 0 | 1;
    status: 'PAID' | 'UNPAID';
    paid_at: number | null;
    note: string | null;
}


interface Fee {
    flat: number;
    percent: number | string;  
}

export interface PaymentType {
    group: string;
    code: string;
    name: string;
    type: string;
    fee_merchant: Fee;
    fee_customer: Fee;
    total_fee: Fee;
    minimum_fee: number | null;
    maximum_fee: number | null;
    minimum_amount: number;
    maximum_amount: number;
    icon_url: string;
    active: boolean;
}

export type PaymentGroup = {
    name: string;
    data: PaymentType[]
}
