import log from "loglevel";
import {spawn} from "child_process";
import { session } from "electron";
import LegendaryTool from "@/service/tools/LegendaryTool";
import {readdir, readFile} from "fs/promises";
import Game from "@/models/legendary/Game";
import Store from "electron-store";
import SystemTool from "@/service/tools/SystemTool";
import InstallProgress from "@/models/legendary/InstallProgress";
import WineTool from "@/service/tools/WineTool";

export default class LegendaryService {

    static async getUsername() {
        const path = `${LegendaryTool.legendaryConfigPath}/user.json`
        const { displayName } = JSON.parse(await readFile(path, "utf-8"))
        log.info("User: ", displayName)
        return displayName
    }

    static async launch(appName: String) {
        log.info("Running...")
        const command  = `${LegendaryTool.legendaryBin} launch ${appName} --wine ${WineTool.wineBin} --wine-prefix ${WineTool.winePrefix}`
        log.info("Command: ", command)

        try {
            const execution = await SystemTool.execAsync(command, SystemTool.execOptions)
            log.debug(execution.stdout)
            log.info("Execution done")
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }


    static async getGameProgress(appName: string) {
        const logPath = `${LegendaryTool.legendaryConfigPath}/${appName}.log`

        const unixProgressCommand = `tail ${logPath} | grep 'Progress: ' | awk '{print $5, $11}' | tail -1`
        const progressCommand = unixProgressCommand

        const unixDownloadedCommand = `tail ${logPath} | grep 'Downloaded: ' | awk '{print $5}' | tail -1`
        const downloadedCommand = unixDownloadedCommand

        const unixEtaCommand = `tail ${logPath}| grep 'Progress: ' | awk '{print $11}' | tail -1`
        const etaCommand = unixEtaCommand

        const unixDownloadSizeCommand = `cat ${logPath} | grep 'Download size: ' | awk '{print $5}'`
        const downloadSizeCommand = unixDownloadSizeCommand

        const { stdout: progressResult } = await SystemTool.execAsync(progressCommand, {
            shell: SystemTool.getShell()
        })
        const { stdout: downloadedResult } = await SystemTool.execAsync(downloadedCommand, {
            shell: SystemTool.getShell()
        })
        const { stdout: etaResult } = await SystemTool.execAsync(etaCommand, {
            shell: SystemTool.getShell()
        })
        const { stdout: downloadSizeResult } = await SystemTool.execAsync(downloadSizeCommand, {
            shell: SystemTool.getShell()
        })

        let percent: string
        let eta: string
        let bytes: string
        let downloadSize: string

        percent = progressResult.split(" ")[0]
        eta = etaResult
        bytes = downloadedResult + "MiB"
        downloadSize = downloadSizeResult + "MiB"

        const progress = new InstallProgress(bytes, eta, percent, downloadSize)
        log.info(`Game: ${appName} Percent: ${progress.percent} Downloaded: ${progress.bytes}/${downloadSize} ETA: ${eta}`)
        return progress
    }

    static async installGame(appName: string, path: string, installDlcs: boolean = false) {
        log.info("Start installation")
        const maxWorkers = 4
        const workers = `--max-workers ${maxWorkers}`
        const withDlcs = installDlcs ? "--with-dlcs" : "--skip-dlcs"
        const installSdl = "--skip-sdl"
        const platformToInstall = "Windows"
        const writeLog = `|& tee "${LegendaryTool.legendaryConfigPath}/${appName}.log"`
        const command = `${LegendaryTool.legendaryBin} install ${appName} --platform ${platformToInstall} --base-path ${path} ${withDlcs} ${installSdl} ${workers} --yes ${writeLog}`
        log.debug(command)

        try {
            const execution = await SystemTool.execAsync(command, SystemTool.execOptions)
            log.debug(execution.stdout)
            log.info("Installation done")
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }

    }

    static async getLibrary(): Promise<Game[]> {
        log.info("Loading library...")

        const command: string[] = "list".split(" ")

        try {
            const child = spawn(LegendaryTool.legendaryBin, command)
            child.on("close", () => log.info("Finished"))

            const library: Game[] = []
            const list = await readdir(LegendaryTool.libraryPath)
            for (let index in list) library.push(await LegendaryTool.loadGame(list[index]))
            return library
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }

    static login(sid: string) {
        log.info("Logging with Legendary...")

        const command: string[] = `auth --sid ${sid}`.split(" ")

        try {
            const child = spawn(LegendaryTool.legendaryBin, command)
            child.on("close", () => log.info("Finished login"))
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }

    static async logout() {
        const command: string[] = "auth --delete".split(" ")
        const child = spawn(LegendaryTool.legendaryBin, command)
        child.on("close", () => log.info("Legendary logout successfully..."))
        const ses = session.fromPartition('persist:epicstore')
        await ses.clearStorageData()
        await ses.clearCache()
        await ses.clearAuthCache()
        await ses.clearHostResolverCache()
        const store = new Store()
        store.clear()
    }

}