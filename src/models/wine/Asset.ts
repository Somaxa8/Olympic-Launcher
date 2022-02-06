import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Asset")
export class Asset {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("name", String, true)
    fileName?: string = undefined
    @JsonProperty("browser_download_url", String, true)
    downloadUrl?: string = undefined

    get name(): string {
        const name = this.fileName!.replace(".tar.xz", "")
        return name.replace("wine-lutris", "lutris")
    }
}