import {env, execPath} from "process";
import {homedir} from "os";

export default class SystemTool {

    static readonly isFlatpak: boolean = execPath === "/app/main/olympic-launcher"
    static readonly flatpakHome: string = env.XDG_DATA_HOME?.replace("/data", "") || homedir()
    static readonly home: string = this.isFlatpak ? this.flatpakHome : homedir()

}