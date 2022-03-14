import Settings from "@/models/Settings";
import DxvkService from "@/service/DxvkService";
import Vkd3dService from "@/service/Vkd3dService";
import WineService from "@/service/WineService";
import Store from "electron-store";
import log from "loglevel";

export default class SettingsService {

    static async check() {
        const store = new Store()
        const savedSettings = store.get("settings") as Settings | undefined
        let settings = savedSettings ? savedSettings : new Settings()


        if (settings.dxvk && !DxvkService.isEnable()) await DxvkService.enable()
        if (settings.vkd3d && !Vkd3dService.isEnable()) await Vkd3dService.enable()

        if (!settings.dxvk && DxvkService.isEnable()) await DxvkService.disable()
        if (!settings.vkd3d && Vkd3dService.isEnable()) await Vkd3dService.disable()

        settings.wineVersions = await WineService.getLocalBuildsWine()
        const currentWine = new Store().get("wine-version") as string
        settings.wineVersion = settings.wineVersion != "" ? settings.wineVersion : currentWine

        store.set("settings", settings)

        log.info(savedSettings)
    }

    static async saveSettings(settings: Settings) {
        new Store().set("settings", settings)
        await this.check()
    }

    static getSettings(): Settings {
        return new Store().get("settings") as Settings
    }


}