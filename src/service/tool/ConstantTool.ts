import {join} from "path";

export default class ConstantTool {

    static readonly LEGENDARY_BIN: string = join(__dirname, "/bin/", process.platform, "/legendary")
    static readonly PROJECT_NAME = "Olympic Launcher"

}