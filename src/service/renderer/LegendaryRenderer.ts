import Game from "@/model/legendary/Game";

export default class LegendaryRenderer {

    static getLibrary(window: Window): Game[] {
        //@ts-ignore
        return window.ipc.sendSync("get-library")
    }
}