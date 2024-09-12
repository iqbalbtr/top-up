import PDFDocument from 'pdfkit'
import type { InvoiceType } from '~/types/invoice.type';
import type { AccountInfo } from '~/types/transaction.type';

const config = useRuntimeConfig()

export function createInvoice(invoice: InvoiceType): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        let buffers: Buffer[] = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        doc.on("error", (err) => reject(err));

        generateHeader(doc);
        generateCustomerInformation(doc, invoice);
        generateInvoiceTable(doc, invoice);
        generateFooter(doc);

        doc.end();
    });
}
function generateHeader(doc: PDFKit.PDFDocument) {
    doc
        .image("./public/logo.png", 40, 35, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .font("Helvetica-Bold")
        .text(config.public.appName, 110, 57)
        .fontSize(10)
        .text(config.public.appName, 200, 50, { align: "right" })
        .text(config.public.appAddress, 200, 65, { align: "right" })
        .text(`${config.public.appCity}, ${config.public.appProvince}`, 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc: PDFKit.PDFDocument, invoice: InvoiceType) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .font("Helvetica-Bold")
        .text("Invoice Pembelian", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("No", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(formatString(invoice.invoice_info.no), 150, customerInformationTop)
        .font("Helvetica")
        .text("Tanggal Pembelian", 50, customerInformationTop + 15)
        .text(formatString(formatDate(invoice.invoice_info.create_at)), 150, customerInformationTop + 15)
        .text("Tanggal Kadaluarsa", 50, customerInformationTop + 30)
        .text(formatString(formatDate(invoice.invoice_info.expired)), 150, customerInformationTop + 30)

        .font("Helvetica")
        .text('Status Pembayaran', 300, customerInformationTop)
        .text(formatString(invoice.invoice_info.status_payment), 400, customerInformationTop)
        .text('Status Transaksi', 300, customerInformationTop + 15)
        .text(formatString(invoice.invoice_info.status_payment), 400, customerInformationTop + 15)
        .text('UID', 300, customerInformationTop + 30)
        .text(formatString(formatUid(invoice.invoice_info.account)), 400, customerInformationTop + 30)
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: InvoiceType) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Name",
        'Sku',
        "Product",
        "Harga satuan",
        "Jumlah",
        "Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.item_orders.length; i++) {
        const item = invoice.item_orders[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.name,
            item.sku,
            item.product,
            (item.price / item.quantity).toString(),
            item.quantity.toString(),
            (item.quantity * item.price).toString()
        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "",
        "Sub Total",
        "",
        invoice.footer.sub_total
    );

    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "",
        "Biaya Fee",
        "",
        invoice.footer.total_fee
    );

    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "",
        "",
        "Total",
        "",
        invoice.footer.total
    );
    doc.font("Helvetica");
}

function generateFooter(doc: PDFKit.PDFDocument) {
    doc
        .fontSize(10)
        .text(
            "Terima Kasih telah membeli produk kami",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc: PDFKit.PDFDocument,
    y: number,
    name: string,
    sku: string,
    product: string,
    unitCost: string,
    quantity: string,
    lineTotal: string
) {
    doc
        .fontSize(10)
        .text(name, 50, y)
        .text(product, 150, y)
        .text(sku, 220, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

function formatString(data: string) {
    return ` : ${data}`
}

function formatUid(account: AccountInfo) {
    if (!account.server && !account.uid)
        return '-'

      return account.uid + (account.server ? `(${account.server})` : '');
}