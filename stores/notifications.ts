export type NotifType = {
    id: number;
    message: string;
}

export const useNotification = defineStore('notification', {
    state: () => ({
        notifications: [] as NotifType[]
    }),
    actions: {
        setNotif(req: string) {
            const payload = {
                id: Date.now(),
                message: req
            }
            this.notifications.push(payload);
            setTimeout(() => {
                const index = this.notifications.findIndex(fo => fo.id === payload.id);
                if (index !== -1) {
                    this.notifications.splice(index, 1);
                }
            }, 5000);
        }
    }
})