import {ipcMain, IpcMainEvent, BrowserWindow, Notification as Toast} from "electron";
import Notification from "@/models/Notification";
import NotificationService from "@/service/NotificationService";

export default class NotificationMain {

    static main(windows: BrowserWindow) {

        ipcMain.on("notification", async (event: IpcMainEvent, notification: Notification) => {
            NotificationService.make(notification)
        })

    }
}