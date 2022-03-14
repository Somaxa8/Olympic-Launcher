import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import Settings from "@/models/Settings";
import SettingsService from "@/service/SettingsService";
import log from "loglevel";

export default class SettingsMain {

    static main(windows: BrowserWindow) {

        ipcMain.on("set-settings", async (event: IpcMainEvent, settings: Settings) => {
            await SettingsService.saveSettings(settings)
        })

        ipcMain.on("get-settings", async (event: IpcMainEvent) => {
            event.returnValue = SettingsService.getSettings()
        })

    }
}