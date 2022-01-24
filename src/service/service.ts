import {BrowserWindow} from "electron";
import WindowMain from "@/service/main/WindowMain";

export default (windows: BrowserWindow) => {
    WindowMain.main(windows)
}