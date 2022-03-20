import Settings from "@/models/Settings";
import DxvkService from "@/service/DxvkService";
import Vkd3dService from "@/service/Vkd3dService";
import WineService from "@/service/WineService";
import Store from "electron-store";
import log from "loglevel";
import NotificationService from "@/service/NotificationService";
import SystemTool from "@/service/tools/SystemTool";

export default class SettingsService {

    static async check() {
        const store = new Store()
        const savedSettings = store.get("settings") as Settings | undefined
        let settings = savedSettings ? savedSettings : new Settings()


        if (settings.dxvk && !DxvkService.isEnable()) await DxvkService.enable()
        if (!settings.dxvk && DxvkService.isEnable()) await DxvkService.disable()

        if (settings.vkd3d && !Vkd3dService.isEnable()) await Vkd3dService.enable()
        if (!settings.vkd3d && Vkd3dService.isEnable()) await Vkd3dService.disable()

        if (settings.fsr && !SettingsService.isFSREnable()) await SettingsService.enableFSR(settings)
        if (!settings.fsr && SettingsService.isFSREnable()) await SettingsService.disableFSR(settings)

        await SettingsService.setFSRStrength(settings)

        settings.wineVersions = await WineService.getLocalBuildsWine()
        const currentWine = new Store().get("wine-version") as string
        settings.wineVersion = settings.wineVersion != "" ? settings.wineVersion : currentWine

        store.set("settings", settings)

        log.info(savedSettings)
    }

    static async saveSettings(settings: Settings) {
        new Store().set("settings", settings)
        await this.check()
        NotificationService.make({title: "Saved Settings", body: "Your settings have been saved successfully"})
    }

    static getSettings(): Settings {
        return new Store().get("settings") as Settings
    }

    static async enableFSR(settings: Settings) {
        process.env.WINE_FULLSCREEN_FSR = "1"
        settings.fsr = true
        log.info("FSR enabled")
    }

    static async disableFSR(settings: Settings) {
        process.env.WINE_FULLSCREEN_FSR = "0"
        settings.fsr = false
        log.info("FSR disabled")
    }

    static async setFSRStrength(settings: Settings) {
        process.env.WINE_FULLSCREEN_FSR_STRENGTH = settings.fsrSharpness.toString()
        log.info("set FSR strength to: ", settings.fsrSharpness)
    }

    static isFSREnable(): boolean {
        return process.env.WINE_FULLSCREEN_FSR != undefined && process.env.WINE_FULLSCREEN_FSR == "1"
    }


}