import Settings from "@/models/Settings";

export default class SettingsRenderer {


    static getSettings(): Settings {
        //@ts-ignore
        return window.ipc.sendSync("get-settings")
    }

    static setSettings(settings: Settings) {
        //@ts-ignore
        return window.ipc.send("set-settings", settings)
    }

}