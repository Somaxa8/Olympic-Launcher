import Game from "@/model/legendary/Game";
import log from "loglevel";
import InstallProgress from "@/model/legendary/InstallProgress";
import RendererTool from "@/service/tool/RendererTool";
import {Vue} from "vue-property-decorator";

export default class LegendaryRenderer {

    static async getProgress(window: Window, appName: string, previousProgress: InstallProgress) {
        //@ts-ignore
        const progress = await window.ipc.invoke("game-progress", appName)

        if (progress) {
            if (previousProgress) {
                const legendaryPercent = RendererTool.getProgress(progress)
                const olympicPercent = RendererTool.getProgress(previousProgress)
                const newPercent: number = Math.round(
                    (legendaryPercent / 100) * (100 - olympicPercent) + olympicPercent
                )
                progress.percent = `${newPercent}%`
            }
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