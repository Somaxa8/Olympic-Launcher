<template>
    <div>
        <webview id="loginView" class="webview" allowpopups partition="persist:epicstore" :preload="loginInjector" src="https://www.epicgames.com/id/login?redirectUrl=https%3A%2F%2Fwww.epicgames.com%2Fid%2Fapi%2Fredirect" />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import InjectorTool from "@/service/tools/InjectorTool";
import WebviewTag = Electron.WebviewTag;
import SessionRenderer from "@/service/renderer/SessionRenderer";
import SessionModule from "@/store/SessionModule";
import {getModule} from "vuex-module-decorators";

@Component
export default class LoginView extends Vue {
    // @ts-ignore
    loginInjector: string = InjectorTool.LOGIN_INJECTOR
    sessionModule: SessionModule = getModule(SessionModule)

    created() {
        setTimeout(() => {
            const loginView: WebviewTag = document.querySelector("#loginView")!
            loginView.findInPage("sid")
            loginView.addEventListener("found-in-page", async (res) => {
                if (res.result.matches) {
                    this.sessionModule.setSession(SessionRenderer.getSession(window))
                    this.sessionModule.saveSession()
                    this.$router.push("/")
                }
            })
        }, 500)
    }

}
</script>

<style>
.webview {
    width:100%;
    height:100vh;
}
</style>
