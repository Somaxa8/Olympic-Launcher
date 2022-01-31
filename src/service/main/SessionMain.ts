import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import Session from "@/model/Session";
import Store from "electron-store";
import LegendaryService from "@/service/LegendaryService";

export default class SessionMain {


    static main(windows: BrowserWindow) {
        const store = new Store()

        ipcMain.on("set-session", async (event: IpcMainEvent, data: string) => {
            const {sid} = JSON.parse(data)
            const session = new Session()
            session.sid = sid
            store.set("session", session)

            await LegendaryService.login(sid)
        })

        ipcMain.on("get-session", async (event: IpcMainEvent) => {
            event.returnValue = store.get("session")
        })

    }

}