import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import Session from "@/model/Session";
import Store from "electron-store";
import log from "loglevel";

export default class SessionMain {


    static main(windows: BrowserWindow) {
        const store = new Store()

        ipcMain.on("set-session", async (event: IpcMainEvent, data: string) => {
            const {sid} = JSON.parse(data)
            const session = new Session()
            session.sid = sid
            store.set("session", session)

            // log.info("Session has been saved: ", store.get("session"))
        })

        ipcMain.on("get-session", async (event: IpcMainEvent) => {
            event.returnValue = store.get("session")
        })

    }

}