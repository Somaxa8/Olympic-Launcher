import axios from "axios";
import JsonTool from "@/service/tools/JsonTool";
import Release from "@/models/wine/Release";
import log from "loglevel";
import download from "download";
import WineTool from "@/service/tools/WineTool";
import {existsSync, writeFileSync} from "fs";
import {mkdir, rm} from "fs/promises";
import SystemTool from "@/service/tools/SystemTool";
import Store from "electron-store";

export default class WineService {

    static async update() {
        log.info("Checking for updates...")
        try {
            const response = await axios.get("https://api.github.com/repos/GloriousEggroll/wine-ge-custom/releases/latest")
            const release = JsonTool.jsonConvert.deserializeObject(response.data, Release)

            if (!existsSync(WineTool.winePath)) await mkdir(WineTool.winePath)
            if (existsSync(WineTool.winePath + release.asset.name)) {
                log.error("This version of wine already exists")
                return Promise.reject("This version of wine already exists")
            }

            writeFileSync(WineTool.winePath + release.asset.fileName, await download(release.asset.downloadUrl!));

            const command = `tar -xf ${WineTool.winePath + release.asset.fileName} -C ${WineTool.winePath}`
            await SystemTool.execAsync(command, SystemTool.execOptions)
            await rm(WineTool.winePath + release.asset.fileName)

            const store = new Store()
            store.set("wine-version", release.asset.name)

            log.info("!We have downloaded a new update -", release.asset.name)
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }
    
}