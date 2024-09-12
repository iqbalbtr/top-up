import type { ProductType, TypeItem } from "~/types/product.type";

export const useProduct = defineStore("product", {
    state: () => ({
        recomen: [] as ProductType[],
        popular: [] as ProductType[],
        products: [] as ProductType[],
        type: {
            current: "top-up-game",
            list: [] as ProductType[],
        },
    }),
    getters: {
        productType: (state) => {
            const result: TypeItem[] = [];
            state.products.forEach((prod) => {
                if (!result.find((res) => res.slug === prod.type.slug)) {
                    result.push(prod.type);
                }
            });

            return result;
        },
    },
    actions: {
        getProductByType(type: string) {
            this.type.list = this.products.filter((fo) => fo.type.slug === type);
            this.type.current = type;
        },
        storeProduct(name: "products" | "recomen" | "popular", data: ProductType[]) {
            this[name] = data;
            this.type.current = "top-up-game"
            this.type.list = this.products.filter((fo) => fo.type.slug === "top-up-game")
        },
    },

})