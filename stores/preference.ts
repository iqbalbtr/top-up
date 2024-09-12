import data from "@/assets/json/lang.json";

export const usePreference = defineStore("preference", {
    state: () => ({
        lang: "id" as "id" | "en", 
        data: data
    }),
    getters: {
        localizedData(state) {
            return state.data[state.lang]; // getter tergantung pada lang
        }
    },
    actions: {
        setLang(req: "id" | "en") {
            this.lang = req; // mengubah nilai lang
        }
    }
});