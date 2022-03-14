import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import Session from "@/models/Session";
import Store from "electron-store";
import LegendaryService from "@/service/LegendaryService";
import log from "loglevel";

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

        ipcMain.on("delete-session", async (event: IpcMainEvent, data: string) => {
            await LegendaryService.logout()
        })

        ipcMain.on("get-session", async (event: IpcMainEvent) => {
            event.returnValue = store.get("session")
        })

        ipcMain.on("get-username", async (event: IpcMainEvent) => {
            event.returnValue = await LegendaryService.getUsername()
        })

    }

}