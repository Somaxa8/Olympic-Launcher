import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import LegendaryService from "@/service/LegendaryService";

export default class LegendaryMain {


    static main(windows: BrowserWindow) {

        ipcMain.on("get-library", async (event: IpcMainEvent) => {
            const library = await LegendaryService.getLibrary()
            event.reply("response-library", library)
        })

    }

}