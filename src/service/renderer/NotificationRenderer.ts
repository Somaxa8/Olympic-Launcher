import Notification from "@/models/Notification";

export default class NotificationRenderer {

    static make(title: string, body: string) {
        //@ts-ignore
        return window.ipc.send("notification", new Notification(title, body))
    }

}