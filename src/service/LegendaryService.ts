import log from "loglevel";
import {spawn} from "child_process";
import { session } from "electron";
import LegendaryTool from "@/service/tool/LegendaryTool";
import {existsSync, readdirSync} from "fs";
import Game from "@/model/legendary/Game";

export default class LegendaryService {

    static getLibrary(): Game[] {
        log.info("Loading library...")

        const command: string[] = "list".split(" ")

        try {
            const child = spawn(LegendaryTool.legendaryBin, command)
            child.on("close", () => log.info("Finished"))
        } catch (err) {
            log.error(err)
        }

        if (!existsSync(LegendaryTool.libraryPath)) {
            log.error("Library path no exists...")
            return []
        }

        return readdirSync(LegendaryTool.libraryPath).map((filename: any) => LegendaryTool.loadGame(filename))
    }

    static login(sid: string) {
        log.info("Logging with Legendary...")

        const command: string[] = `auth --sid ${sid}`.split(" ")

        try {
            const child = spawn(LegendaryTool.legendaryBin, command)
            child.on("close", () => log.info("Finished login"))
        } catch (err) {
            log.error(err)
        }
    }

    static async logout() {
        // await execAsync(`${legendaryBin} auth --delete`)
        const ses = session.fromPartition('persist:epicstore')
        await ses.clearStorageData()
        await ses.clearCache()
        await ses.clearAuthCache()
        await ses.clearHostResolverCache()
        // TODO: implement clear electron-store data & legendary logout
    }

}