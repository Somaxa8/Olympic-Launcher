import log from "loglevel";
import axios from "axios";
import JsonTool from "@/service/tools/JsonTool";
import Release from "@/models/github/Release";
import {existsSync, writeFileSync} from "fs";
import {mkdir, readdir, rm} from "fs/promises";
import download from "download";
import SystemTool from "@/service/tools/SystemTool";
import Store from "electron-store";
import Vkd3dTool from "@/service/tools/Vkd3dTool";
import DllTool from "@/service/tools/DllTool";
import WineTool from "@/service/tools/WineTool";

export default class Vkd3dService {

    static async enable() {
        const filesX32 = await readdir(Vkd3dTool.currentVkd3dX32)
        const filesX64 = await readdir(Vkd3dTool.currentVkd3dX64)

        await DllTool.enableDlls(filesX32, WineTool.wineDllsX32Path, Vkd3dTool.currentVkd3dX32)
        await DllTool.enableDlls(filesX64, WineTool.wineDllsX64Path, Vkd3dTool.currentVkd3dX64)
    }

    static async disable() {
        const filesX32 = await readdir(Vkd3dTool.currentVkd3dX32)
        const filesX64 = await readdir(Vkd3dTool.currentVkd3dX64)

        await DllTool.disableDlls(filesX32, WineTool.wineDllsX32Path)
        await DllTool.disableDlls(filesX64, WineTool.wineDllsX64Path)
    }

    static async update() {
        log.info("Checking for updates...")
        try {
            const response = await axios.get("https://api.github.com/repos/HansKristian-Work/vkd3d-proton/releases/latest")
            const release = JsonTool.jsonConvert.deserializeObject(response.data, Release)

            if (!existsSync(Vkd3dTool.vkd3dPath)) await mkdir(Vkd3dTool.vkd3dPath)
            if (existsSync(Vkd3dTool.vkd3dPath + release.vkd3dAsset.vkd3dName)) {
                log.error("This version of vkd3d already exists")
                return Promise.reject("This version of vkd3d already exists")
            }

            writeFileSync(Vkd3dTool.vkd3dPath + release.vkd3dAsset.fileName, await download(release.vkd3dAsset.downloadUrl!));

            const command = `tar -I zstd -xf  ${Vkd3dTool.vkd3dPath + release.vkd3dAsset.fileName} -C ${Vkd3dTool.vkd3dPath}`
            await SystemTool.execAsync(command, SystemTool.execOptions)
            await rm(Vkd3dTool.vkd3dPath + release.vkd3dAsset.fileName)

            const store = new Store()
            store.set("vkd3d-version", release.vkd3dAsset.vkd3dName)

            log.info("!We have downloaded a new update -", release.vkd3dAsset.vkd3dName)
        } catch (err) {
            log.error(err)
            return Promise.reject(err)
        }
    }

}