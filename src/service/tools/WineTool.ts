import LegendaryTool from "@/service/tools/LegendaryTool";
import Store from "electron-store";

export default class WineTool {

    static get currentWine() {
        const version = new Store().get("wine-version")
        return WineTool.winePath + version
    }

    static readonly winePath = `${LegendaryTool.olympicFolderPath}/wine/`
    static readonly wineBin = `${WineTool.currentWine}/bin/wine`
}