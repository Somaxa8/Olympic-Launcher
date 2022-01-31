import {BrowserWindow} from "electron";
import WindowMain from "@/service/main/WindowMain";
import SessionMain from "@/service/main/SessionMain";
import LegendaryMain from "@/service/main/LegendaryMain";

export default (windows: BrowserWindow) => {
    LegendaryMain.main(windows)
    WindowMain.main(windows)
    SessionMain.main(windows)
}