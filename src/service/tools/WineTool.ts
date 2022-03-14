import LegendaryTool from "@/service/tools/LegendaryTool";
import SettingsService from "@/service/SettingsService";

export default class WineTool {

    static get currentWine() {
        const version = SettingsService.getSettings().wineVersion
        return WineTool.winePath + version
    }

    static get wineBin(): string {
        return `${WineTool.currentWine}/bin/wine`
    }

    static readonly winePath = `${LegendaryTool.olympicFolderPath}/wine/`
    static readonly winePrefix = `${LegendaryTool.olympicFolderPath}/.wine`
    static readonly wineDllsX32Path = `${WineTool.winePrefix}/drive_c/windows/syswow64`
    static readonly wineDllsX64Path = `${WineTool.winePrefix}/drive_c/windows/system32`
}