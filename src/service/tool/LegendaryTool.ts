import {join} from "path";
import SystemTool from "@/service/tool/SystemTool";
import {readFileSync} from "fs";
import Game from "@/model/legendary/Game";

export default class LegendaryTool {

    // @ts-ignore
    static readonly legendaryBin: string = join(__static, "/bin/", process.platform, "/legendary")
    static readonly legendaryConfigPath: string = SystemTool.isFlatpak ? `${SystemTool.home}/config/legendary` : `${SystemTool.home}/.config/legendary`
    static readonly libraryPath: string = `${this.legendaryConfigPath}/metadata/`


    static loadGame(filename: string): Game {
        const path = `${this.libraryPath}/${filename}`
        const { app_name, metadata } = JSON.parse(readFileSync(path, "utf-8"))
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

        // const info = this.installedGames.get(app_name)
        // const {
        //     executable = null,
        //     version = null,
        //     install_size = null,
        //     install_path = null,
        //     platform,
        //     is_dlc = metadata.categories.filter(
        //         ({ path }: { path: string }) => path === "dlc"
        //     ).length || dlcs.includes(app_name)
        // } = (info === undefined ? {} : info) as InstalledInfo
        // //
        // const convertedSize = install_size && prettyBytes(Number(install_size))

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
        // game.install = {executable, install_path, install_size: convertedSize, is_dlc, version, platform}
        // game.isInstalled = info !== undefined
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