import Settings from "@/models/Settings";
import DxvkService from "@/service/DxvkService";
import Vkd3dService from "@/service/Vkd3dService";
import WineService from "@/service/WineService";
import Store from "electron-store";
import log from "loglevel";
import NotificationService from "@/service/NotificationService";

export default class SettingsService {

    static async check() {
        log.info("Checking settings...")

        await WineService.createPrefixIfNoExists()

        const store = new Store()
        const savedSettings = store.get("settings") as Settings | undefined
        let settings = savedSettings ? savedSettings : new Settings()


        if (settings.dxvk && !DxvkService.isEnable()) await DxvkService.enable()
        if (!settings.dxvk && DxvkService.isEnable()) await DxvkService.disable()

        if (settings.vkd3d && !Vkd3dService.isEnable()) await Vkd3dService.enable()
        if (!settings.vkd3d && Vkd3dService.isEnable()) await Vkd3dService.disable()

        if (settings.fsr && !SettingsService.isFSREnable()) await SettingsService.enableFSR(settings)
        if (!settings.fsr && SettingsService.isFSREnable()) await SettingsService.disableFSR(settings)

        if (settings.esync && !SettingsService.isEsyncEnable()) await SettingsService.enableEsync(settings)
        if (!settings.esync && SettingsService.isEsyncEnable()) await SettingsService.enableEsync(settings)

        if (settings.fsync && !SettingsService.isFsyncEnable()) await SettingsService.enableFsync(settings)
        if (!settings.fsync && SettingsService.isFsyncEnable()) await SettingsService.enableFsync(settings)

        await SettingsService.setFSRStrength(settings)

        settings.wineVersions = await WineService.getLocalBuildsWine()
        const currentWine = new Store().get("wine-version") as string
        settings.wineVersion = settings.wineVersion != "" ? settings.wineVersion : currentWine

        store.set("settings", settings)

        log.info(savedSettings)
        log.debug(process.env)
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

    static async enableEsync(settings: Settings) {
        process.env.WINEESYNC = "1"
        settings.esync = true
        log.info("Esync enabled")
    }

    static async disableEsync(settings: Settings) {
        process.env.WINEESYNC = "0"
        settings.esync = false
        log.info("Esync disabled")
    }

    static isEsyncEnable(): boolean {
        return process.env.WINEESYNC != undefined && process.env.WINEESYNC == "1"
    }

    static async enableFsync(settings: Settings) {
        process.env.WINEEFYNC = "1"
        settings.fsync = true
        log.info("Fsync enabled")
    }

    static async disableFsync(settings: Settings) {
        process.env.WINEFSYNC = "0"
        settings.fsync = false
        log.info("Fsync disabled")
    }

    static isFsyncEnable(): boolean {
        return process.env.WINEFSYNC != undefined && process.env.WINEFSYNC == "1"
    }

}