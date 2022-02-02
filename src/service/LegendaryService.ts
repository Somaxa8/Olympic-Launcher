import log from "loglevel";
import {spawn} from "child_process";
import { session } from "electron";
import LegendaryTool from "@/service/tool/LegendaryTool";
import {readdir} from "fs/promises";
import Game from "@/model/legendary/Game";
import Store from "electron-store";

export default class LegendaryService {

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