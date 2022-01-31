import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import LegendaryService from "@/service/LegendaryService";

export default class LegendaryMain {


    static main(windows: BrowserWindow) {

        ipcMain.on("get-library", async (event: IpcMainEvent) => {
            event.returnValue = LegendaryService.getLibrary()
        })

    }

}