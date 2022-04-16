import {BrowserWindow} from "electron";
import WindowMain from "@/service/main/WindowMain";
import SessionMain from "@/service/main/SessionMain";
import LegendaryMain from "@/service/main/LegendaryMain";
import WineService from "@/service/WineService";
import DxvkService from "@/service/DxvkService";
import Vkd3dService from "@/service/Vkd3dService";
import SettingsService from "@/service/SettingsService";
import SettingsMain from "@/service/main/SettingsMain";
import NotificationMain from "@/service/main/NotificationMain";
import log from "loglevel";

export default (windows: BrowserWindow) => {
    log.info("Exec path: ", process.execPath)

    SettingsService.check()

    LegendaryMain.main(windows)
    WindowMain.main(windows)
    SessionMain.main(windows)
    SettingsMain.main(windows)
    NotificationMain.main(windows)

    WineService.update()
    DxvkService.update()
    Vkd3dService.update()

}