import {Notification as Toast} from "electron";
import Notification from "@/models/Notification";

export default class NotificationService {

    static make(notification: Notification) {
        new Toast({title: notification.title, body: notification.body}).show()
    }

}