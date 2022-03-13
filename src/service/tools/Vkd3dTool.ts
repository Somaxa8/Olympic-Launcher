import LegendaryTool from "@/service/tools/LegendaryTool";
import Store from "electron-store";

export default class Vkd3dTool {

    static readonly vkd3dPath = `${LegendaryTool.olympicFolderPath}/vkd3d/`

    static get currentVkd3dX32() {
        const version = new Store().get("vkd3d-version")
        return Vkd3dTool.vkd3dPath + version + "/x86"
    }

    static get currentVkd3dX64() {
        const version = new Store().get("vkd3d-version")
        return Vkd3dTool.vkd3dPath + version + "/x64"
    }

}