import type { PaymentGroup, PaymentType } from "~/types/tripay.type";

export const usePayment = defineStore("payment", {
    state: () => ({
        list: [] as PaymentType[]
    }),
    getters: {
        group: (state) => {
            let result: PaymentGroup[] = [] 
            
            state.list.forEach(pay => {
                if(!result.find(fo => fo.name === pay.group)){
                    result.push({
                        name: pay.group,
                        data: state.list.filter(fo => fo.group === pay.group)
                    })
                }
            });
            
            return result
        }
    },
    actions: {
        storePayment(data: PaymentType[]) {
            this.list = data
        }
    }
})