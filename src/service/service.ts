import {BrowserWindow} from "electron";
import WindowMain from "@/service/main/WindowMain";
import SessionMain from "@/service/main/SessionMain";
import LegendaryMain from "@/service/main/LegendaryMain";
import WineService from "@/service/WineService";
import DxvkService from "@/service/DxvkService";
import Vkd3dService from "@/service/Vkd3dService";

export default (windows: BrowserWindow) => {
    LegendaryMain.main(windows)
    WindowMain.main(windows)
    SessionMain.main(windows)

    WineService.update()
    DxvkService.update()
    Vkd3dService.update()
}