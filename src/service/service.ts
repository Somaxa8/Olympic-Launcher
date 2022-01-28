import {BrowserWindow} from "electron";
import WindowMain from "@/service/main/WindowMain";
import SessionMain from "@/service/main/SessionMain";

export default (windows: BrowserWindow) => {
    WindowMain.main(windows)
    SessionMain.main(windows)
}