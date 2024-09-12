import { relations } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable('transactions', {
    id: integer('id', { mode: "number" }).primaryKey({ autoIncrement: true }),
    ref_code: text('ref_code', { mode: 'text' }).unique().notNull(),
    account: blob("account", { mode: "json" }).$type<{ username?: string, uid?: string, server?: string }>(),
    status_transaction: text("status_transaction", { enum: ['CANCELLED', 'SUCCESS', 'PENDING'] }).default('PENDING').notNull(),
    status_payment: text("status_payment").default('UNPAID').notNull(),
    ref_transaction: text('ref_transaction', { mode: "text" }).unique().notNull(),
    create_at: integer('create_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)).notNull(),
    expired: integer('expired', { mode: 'number' }).notNull(),
    method: text('method', { mode: 'text' }).notNull(),
    amount: integer('amount', { mode: 'number' }).notNull(),
    total_fee: integer('total_fee', { mode: 'number' }).default(0).notNull(),
    pay_code: text('pay_code', { mode: 'text' }),
    pay_url: text('pay_url', { mode: 'text' }),
    barcode: text('barcode', { mode: 'text' })
})

export const transactionsRelation = relations(transactions, ({ many }) => ({
    order_items: many(orderItem)
}))

export const orderItem = sqliteTable('order_item', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    ref_code: text('ref_code').notNull(),
    code_item: text('code', { mode: 'text' }).notNull(),
    code_product: text('code_product', { mode: 'text' }).notNull(),
    quantity: integer('quantity', { mode: 'number' }).notNull(),
    price: integer('price', { mode: 'number' }).notNull(),
    name: text('name', { mode: 'text' }).notNull(),
    sub_total: integer('sub_total', { mode: 'number' }).notNull()
})

export const orderItemRelation = relations(orderItem, ({ one }) => ({
    transaction: one(transactions, {
        fields: [orderItem.ref_code],
        references: [transactions.ref_code]
    })
}))