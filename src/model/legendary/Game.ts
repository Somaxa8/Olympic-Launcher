export default class Game {
    appName!: string
    artCover!: string
    artLogo!: string
    artSquare!: string
    cloudSaveEnabled!: boolean
    compatibleApps: string[] = []
    developer!: string
    extra!: ExtraInfo
    folderName!: string
    install!: InstalledInfo
    isGame!: boolean
    isInstalled!: boolean
    isUeAsset!: boolean
    isUePlugin!: boolean
    isUeProject!: boolean
    namespace!: string
    saveFolder!: string
    title!: string
    canRunOffline!: boolean
    isMacNative!: boolean
}

export interface InstalledInfo {
    executable: string | null
    install_path: string | null
    install_size: string | null
    is_dlc: boolean
    version: string | null
    platform: string
}

interface ExtraInfo {
    about: About
    reqs: Reqs[]
}

interface About {
    description: string
    shortDescription: string
}

interface Reqs {
    minimum: string
    recommended: string
    title: string
}