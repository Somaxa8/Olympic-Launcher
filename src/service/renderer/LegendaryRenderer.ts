import Game from "@/models/legendary/Game";
import log from "loglevel";
import InstallProgress from "@/models/legendary/InstallProgress";
import RendererTool from "@/service/tools/RendererTool";
import {Vue} from "vue-property-decorator";

export default class LegendaryRenderer {

    static launchGame(appName: string) {
        //@ts-ignore
        window.ipc.send("launch-game", appName)
    }

    static async getProgress(window: Window, appName: string, previousProgress: InstallProgress) {
        //@ts-ignore
        const progress = await window.ipc.invoke("game-progress", appName)

        if (progress) {
            const legendaryPercent = RendererTool.getProgress(progress)
            const olympicPercent = RendererTool.getProgress(previousProgress)
            const newPercent: number = Math.round(
                (legendaryPercent / 100) * ((100 - olympicPercent) + olympicPercent)
            )
            progress.percent = `${newPercent}%`
            return previousProgress.setInstallProgress(progress)
        }
    }

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

    static installGame(component: Vue, appName: string) {
        //@ts-ignore
        window.ipc.send("install-game", appName)
        // @ts-ignore
        component.loading = true

        //@ts-ignore
        window.ipc.on("install-status", (args) => {
            // @ts-ignore
            component.loading = false
            log.info(args)
        })
    }
}