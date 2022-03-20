import log from "loglevel";
import axios from "axios";
import JsonTool from "@/service/tools/JsonTool";
import Release from "@/models/github/Release";
import {existsSync, writeFileSync, readdirSync} from "fs";
import {mkdir, readdir, rm} from "fs/promises";
import DxvkTool from "@/service/tools/DxvkTool";
import download from "download";
import SystemTool from "@/service/tools/SystemTool";
import Store from "electron-store";
import DllTool from "@/service/tools/DllTool";
import WineTool from "@/service/tools/WineTool";

export default class DxvkService {

    static isEnable(): boolean {
        const filesX32 = readdirSync(DxvkTool.currentDxvkX32)
        const filesX64 = readdirSync(DxvkTool.currentDxvkX64)
        const x32 = DllTool.isEnableDlls(filesX32, WineTool.wineDllsX32Path)
        const x64 = DllTool.isEnableDlls(filesX64, WineTool.wineDllsX64Path)

        return x32 && x64
    }

    static async enable() {
        log.info("Enabling dxvk...")
        const filesX32 = await readdir(DxvkTool.currentDxvkX32)
        const filesX64 = await readdir(DxvkTool.currentDxvkX64)

        await DllTool.enableDlls(filesX32, WineTool.wineDllsX32Path, DxvkTool.currentDxvkX32)
        await DllTool.enableDlls(filesX64, WineTool.wineDllsX64Path, DxvkTool.currentDxvkX64)
    }

    static async disable() {
        log.info("Disabling dxvk...")
        const filesX32 = await readdir(DxvkTool.currentDxvkX32)
        const filesX64 = await readdir(DxvkTool.currentDxvkX64)

        await DllTool.disableDlls(filesX32, WineTool.wineDllsX32Path)
        await DllTool.disableDlls(filesX64, WineTool.wineDllsX64Path)
    }

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
        }
    }

}