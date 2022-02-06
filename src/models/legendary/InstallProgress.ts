export default class InstallProgress {

    constructor(bytes: string, eta: string, percent: string, downloadSize: string) {
        this.bytes = bytes
        this.eta = eta
        this.percent = percent
        this.downloadSize = downloadSize
    }

    setInstallProgress(progress: InstallProgress) {
        this.bytes = progress.bytes
        this.eta = progress.eta
        this.percent = progress.percent
        this.downloadSize = progress.downloadSize
        return this
    }

    bytes!: string
    eta!: string
    percent!: string
    downloadSize!: string
}