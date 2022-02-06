import InstallProgress from "@/model/legendary/InstallProgress";

export default class RendererTool {

    static getProgress(progress: InstallProgress): number {
        if (progress && progress.percent) {
            return Number(progress.percent.replace("%", ""))
        }
        return 0
    }

}