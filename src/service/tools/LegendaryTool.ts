import {join} from "path";
import SystemTool from "@/service/tools/SystemTool";
import {readFile} from "fs/promises";
import {existsSync} from "fs";
import Game from "@/models/legendary/Game";
import ConstantTool from "@/service/tools/ConstantTool";
import prettyBytes from "pretty-bytes";
import InstalledInfo from "@/models/legendary/InstalledInfo";

export default class LegendaryTool {

    // @ts-ignore
    static readonly legendaryBin = join(__static, "/bin/", process.platform, "/legendary")
    static readonly legendaryConfigPath = SystemTool.isFlatpak ? `${SystemTool.home}/config/legendary` : `${SystemTool.home}/.config/legendary`
    static readonly libraryPath = `${this.legendaryConfigPath}/metadata/`
    static readonly olympicFolderPath = SystemTool.isFlatpak ? `${SystemTool.home}/config/${ConstantTool.PROJECT_FOLDER}` : `${SystemTool.home}/.config/${ConstantTool.PROJECT_FOLDER}`
    static readonly olympicConfigPath = `${LegendaryTool.olympicFolderPath}/config.json`

    static async getInstalledGame(appName: string): Promise<InstalledInfo> {
        const installedJSON = `${this.legendaryConfigPath}/installed.json`
        if (existsSync(installedJSON)) {
            const jsonFile = await readFile(installedJSON, 'utf-8')
            const installedGames = new Map(Object.entries(JSON.parse(jsonFile) as InstalledInfo))
            return installedGames.get(appName)
        } else {
            return {} as InstalledInfo
        }
    }

    static async loadGame(filename: string): Promise<Game> {
        const path = `${LegendaryTool.libraryPath}/${filename}`
        const { app_name, metadata } = JSON.parse(await readFile(path, "utf-8"))
        const { namespace } = metadata
        const isGame = namespace !== "ue"
        const {
            description,
            shortDescription = "",
            keyImages = [],
            title,
            developer,
            dlcItemList,
            releaseInfo,
            categories,
            customAttributes
        } = metadata

        const dlcs: string[] = []
        const cloudSaveFolder = customAttributes?.CloudSaveFolder
        const folderName = customAttributes?.FolderName
        const canRunOffline = customAttributes?.CanRunOffline?.value === "true"

        if (dlcItemList) {
            dlcItemList.forEach((v: { releaseInfo: { [x: number]: { appId: string } } }) => {
                    if (v.releaseInfo && v.releaseInfo[0]) {
                        dlcs.push(v.releaseInfo[0].appId)
                    }
                }
            )
        }

        let isUeAsset = false
        let isUeProject = false
        let isUePlugin = false

        if (categories) {
            categories.forEach((c: { path: string }) => {
                if (c.path == "projects") isUeProject = true
                else if (c.path == "assets") isUeAsset = true
                else if (c.path == "plugins") isUePlugin = true
            })
        }

        let compatibleApps: string[] = []

        releaseInfo.forEach((item: { appId: string; compatibleApps: string[] }) => {
            if (item.appId == app_name) compatibleApps = item.compatibleApps
        })

        const cloudSaveEnabled = isGame && Boolean(cloudSaveFolder?.value)
        const saveFolder = cloudSaveEnabled ? cloudSaveFolder.value : ""
        const installFolder = folderName ? folderName.value : app_name

        const gameBox = isGame ? keyImages.filter(({ type }: { type: string }) => type === "DieselGameBox")[0] : keyImages.filter(({ type }: { type: string }) => type === "Screenshot")[0]
        const gameBoxTall = isGame ? keyImages.filter(({ type }: { type: string }) => type === "DieselGameBoxTall")[0] : gameBox
        const gameBoxStore = isGame ? keyImages.filter(({ type }: { type: string }) => type === "DieselStoreFrontTall")[0] : gameBox

        const logo = isGame ? keyImages.filter(({ type }: { type: string }) => type === "DieselGameBoxLogo")[0] : keyImages.filter(({ type }: { type: string }) => type === "Thumbnail")[0]

        const fallBackImage = "https://user-images.githubusercontent.com/26871415/103480183-1fb00680-4dd3-11eb-9171-d8c4cc601fba.jpg"

        const artCover = gameBox ? gameBox.url : null
        const artLogo = logo ? logo.url : null
        const artSquare = gameBoxTall ? gameBoxTall.url : null
        const artSquareFront = gameBoxStore ? gameBoxStore.url : null

        const info = await LegendaryTool.getInstalledGame(app_name)
        const {
            executable = null,
            version = null,
            install_size = null,
            install_path = null,
            platform,
            is_dlc = metadata.categories.filter(
                ({ path }: { path: string }) => path === "dlc"
            ).length || dlcs.includes(app_name)
        } = (info === undefined ? {} : info) as InstalledInfo

        const convertedSize = install_size && prettyBytes(Number(install_size))

        const game = new Game()
        game.appName = app_name
        game.artCover = artCover || artSquare || fallBackImage
        game.artLogo = artLogo
        game.artSquare = artSquare || artSquareFront || artCover || fallBackImage
        game.cloudSaveEnabled = cloudSaveEnabled
        game.compatibleApps = compatibleApps
        game.developer = developer
        game.extra = {about: {description, shortDescription}, reqs: []}
        game.folderName = installFolder
        game.install = {executable, install_path, install_size: convertedSize, is_dlc, version, platform}
        game.isInstalled = info !== undefined
        game.isGame = isGame
        game.isUeAsset = isUeAsset
        game.isUePlugin = isUePlugin
        game.isUeProject = isUeProject
        game.namespace = namespace
        game.saveFolder = saveFolder
        game.title = title
        game.canRunOffline = canRunOffline

        return game
    }

}