import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";

export default class WindowMain {

    static main(windows: BrowserWindow) {

        ipcMain.on("hide-app", async (event: IpcMainEvent) => {
            windows.minimize()
        })

        ipcMain.on("minimize-app", async (event: IpcMainEvent) => {
            if (windows.isMaximized()) return windows.unmaximize()
            windows.maximize()
        })

        ipcMain.on("close-app", async (event: IpcMainEvent) => {
            windows.close()
        })

    }
}