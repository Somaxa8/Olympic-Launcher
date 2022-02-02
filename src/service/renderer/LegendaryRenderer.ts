import Game from "@/model/legendary/Game";

export default class LegendaryRenderer {

    static getLibrary(window: Window, library: Game[]) {
        setTimeout(() => {
            //@ts-ignore
            window.ipc.send("get-library")
            //@ts-ignore
            window.ipc.on("response-library", (args) => {
                library.splice(0, library.length)
                args.forEach((v: Game) => library.push(v))
            })
        }, 500)
    }
}