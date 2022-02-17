import log from "loglevel";
import axios from "axios";
import JsonTool from "@/service/tools/JsonTool";
import Release from "@/models/github/Release";
import {existsSync, writeFileSync} from "fs";
import {mkdir, rm} from "fs/promises";
import DxvkTool from "@/service/tools/DxvkTool";
import download from "download";
import SystemTool from "@/service/tools/SystemTool";
import Store from "electron-store";

export default class DxvkService {

    static async update() {
        log.info("Checking for updates...")
        try {
            const response = await axios.get("https://api.github.com/repos/doitsujin/dxvk/releases/latest")
            const release = JsonTool.jsonConvert.deserializeObject(response.data, Release)

            if (!existsSync(DxvkTool.dxvkPath)) await mkdir(DxvkTool.dxvkPath)
            if (existsSync(DxvkTool.dxvkPath + release.dxvkAsset.dxvkName)) {
                log.error("This version of dxvk already exists")
                return Promise.reject("This version of dxvk already exists")
            }

            writeFileSync(DxvkTool.dxvkPath + release.dxvkAsset.fileName, await download(release.dxvkAsset.downloadUrl!));

            const command = `tar -xf ${DxvkTool.dxvkPath + release.dxvkAsset.fileName} -C ${DxvkTool.dxvkPath}`
            await SystemTool.execAsync(command, SystemTool.execOptions)
            await rm(DxvkTool.dxvkPath + release.dxvkAsset.fileName)

            const store = new Store()
            store.set("dxvk-version", release.dxvkAsset.dxvkName)

            log.info("!We have downloaded a new update -", release.dxvkAsset.dxvkName)
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }

}