import {ipcMain, IpcMainEvent, BrowserWindow, IpcMainInvokeEvent} from "electron";
import LegendaryService from "@/service/LegendaryService";
import SystemTool from "@/service/tools/SystemTool";
import {join} from "path";
import ConstantTool from "@/service/tools/ConstantTool";

export default class LegendaryMain {


    static main(windows: BrowserWindow) {

        ipcMain.on("get-library", async (event: IpcMainEvent) => {
            const library = await LegendaryService.getLibrary()
            event.reply("response-library", library)
        })

        ipcMain.on("install-game", async (event: IpcMainEvent, appName: string) => {
            await LegendaryService.installGame(appName, join(SystemTool.home, "/Games/", ConstantTool.PROJECT_FOLDER, appName))
            event.reply("install-status", "DONE")
        })

        ipcMain.handle("game-progress", async (event: IpcMainInvokeEvent, appName: string) => {
            return LegendaryService.getGameProgress(appName)
        })

    }

}