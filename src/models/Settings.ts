export default class Settings {
    wineVersions: string[] = [
        "Wine-GE-Proton7-6 Released",
        "Wine-GE-Proton7-5 Released",
        "Wine-GE-Proton7-4 Released"
    ]
    wineVersion = ""
    fsr: boolean = false
    fsrSharpness: number = 1
    fpsCounter: boolean = false
    autoUpdate: boolean = true
    dxvk: boolean = true
    vkd3d: boolean = true
    esync: boolean = false
    fsync: boolean = false
}