import LegendaryTool from "@/service/tool/LegendaryTool";
import Store from "electron-store";

export default class WineTool {

    static readonly winePath = `${LegendaryTool.olympicFolderPath}/wine/`

    static get currentWine() {
        const version = new Store().get("wine-version")
        return WineTool.winePath + version
    }
}