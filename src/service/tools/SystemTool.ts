import {env, execPath} from "process";
import {homedir} from "os";
import { exec } from "child_process";
import { promisify } from "util";

export default class SystemTool {

    static readonly isFlatpak = execPath === "/app/bin/olympic-launcher"
    static readonly flatpakHome = env.XDG_DATA_HOME?.replace("/data", "") || homedir()
    static readonly home = this.isFlatpak ? this.flatpakHome : homedir()
    static readonly MAX_BUFFER = 25 * 1024 * 1024
    static readonly execOptions = {maxBuffer: SystemTool.MAX_BUFFER, shell: SystemTool.getShell(), env: process.env}
    static execAsync = promisify(exec)

    static getShell(): string {
        switch (process.platform) {
            case "win32":
                return "powershell.exe"
            case "linux":
                return "/bin/bash"
            case "darwin":
                return "/bin/zsh"
            default:
                return "/bin/bash"
        }
    }

}