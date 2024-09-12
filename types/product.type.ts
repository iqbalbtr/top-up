export type TypeItem = {
    name: string;
    slug: string;
};

export type ProductPackageType = {
    name: string;
    price: number;
    available: boolean;
    code: string;
    icon: string
}

export type ProductType = {
    id: number;
    name: string;
    publisher: string;
    slug: string;
    icon: string;
    create_at: string;
    type: TypeItem;
    product_code: string;
};