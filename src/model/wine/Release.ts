import {JsonObject, JsonProperty} from "json2typescript";
import {Asset} from "@/model/wine/Asset";

@JsonObject("Release")
export default class Release {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("author.login", String, true)
    author?: string = undefined
    @JsonProperty("tag_name", String, true)
    tagName?: string = undefined
    @JsonProperty("body", String, true)
    description?: string = undefined
    @JsonProperty("assets", [Asset], true)
    assets?: Asset[] = []

    get asset(): Asset {
        return this.assets!.filter((e: Asset) => e.fileName!.includes("tar.xz"))[0]
    }
}