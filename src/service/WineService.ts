import axios from "axios";
import JsonTool from "@/service/tools/JsonTool";
import Release from "@/models/github/Release";
import log from "loglevel";
import download from "download";
import WineTool from "@/service/tools/WineTool";
import {existsSync, writeFileSync} from "fs";
import {mkdir, readdir, rm} from "fs/promises";
import SystemTool from "@/service/tools/SystemTool";
import Store from "electron-store";

export default class WineService {

    static async getLocalBuildsWine() {
        return await readdir(WineTool.winePath)
    }

    static async update() {
        log.info("Checking for updates...")
        try {
            const response = await axios.get("https://api.github.com/repos/GloriousEggroll/wine-ge-custom/releases/latest")
            const release = JsonTool.jsonConvert.deserializeObject(response.data, Release)

            if (!existsSync(WineTool.winePath)) await mkdir(WineTool.winePath)
            if (existsSync(WineTool.winePath + release.wineAsset.wineName)) {
                log.error("This version of wine already exists")
                return Promise.reject("This version of wine already exists")
            }

            writeFileSync(WineTool.winePath + release.wineAsset.fileName, await download(release.wineAsset.downloadUrl!));

            const command = `tar -xf ${WineTool.winePath + release.wineAsset.fileName} -C ${WineTool.winePath}`
            await SystemTool.execAsync(command, SystemTool.execOptions)
            await rm(WineTool.winePath + release.wineAsset.fileName)

            const store = new Store()
            store.set("wine-version", release.wineAsset.wineName)

            log.info("!We have downloaded a new update -", release.wineAsset.wineName)
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }

    static async createPrefixIfNoExists() {
        if (!existsSync(WineTool.winePrefix)) {
            process.env.WINEPREFIX = WineTool.winePrefix
            const command = `${WineTool.wineBin} startup.exe`
            log.debug("Command: ", command)
            await SystemTool.execAsync(command, SystemTool.execOptions)
        }
    }
    
}