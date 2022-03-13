import LegendaryTool from "@/service/tools/LegendaryTool";
import Store from "electron-store";

export default class DxvkTool {

    static readonly dxvkPath = `${LegendaryTool.olympicFolderPath}/dxvk/`

    static get currentDxvkX32() {
        const version = new Store().get("dxvk-version")
        return DxvkTool.dxvkPath + version + "/x32"
    }

    static get currentDxvkX64() {
        const version = new Store().get("dxvk-version")
        return DxvkTool.dxvkPath + version + "/x64"
    }

}