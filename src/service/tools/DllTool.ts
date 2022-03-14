import {symlink, unlink, rename} from "fs/promises";
import {existsSync} from "fs";
import log from "loglevel";
import {join} from "path";

export default class DllTool {

    static async enableDlls(filesToEnable: string[], dllPath: string, dllProviderPath: string) {
        for (const file of filesToEnable) {
            await rename(`${dllPath}/${file}`, `${dllPath}/${file}.orig`)
            await symlink(`${dllProviderPath}/${file}`, `${dllPath}/${file}`)
        }
    }

    static isEnableDlls(filesToEnable: string[], dllPath: string): boolean {
        for (const file of filesToEnable) {
            if (!existsSync(`${dllPath}/${file}`)) return false
            if (!existsSync(`${dllPath}/${file}.orig`)) return false
        }

        return true
    }

    static async disableDlls(filesToDisable: string[], dllPath: string) {
        for (const file of filesToDisable) {
            await unlink(`${dllPath}/${file}`)
            await rename(`${dllPath}/${file}.orig`, `${dllPath}/${file}`)
        }
    }

}